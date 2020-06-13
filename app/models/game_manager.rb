class GameManager
  include GameBroadcaster

  attr_reader :table_id, :table, :game_hand, :just_actioned, :just_created

  # 新規ゲームの開始
  def self.create_new_game(table_id, player)
    table = Table.find(table_id)
    # スタックが無いプレイヤーはゲーム開始時に除外しておく
    table.table_players.each { |tp| tp.stack == 0 && tp.destroy! }

    GameHand.create_new_game(table)

    self.new(table_id, just_created: true)
  end

  # 最新のゲームを取得
  def self.current_game_hand(table_id)
    GameHand.where(table_id: table_id).order(:id).last
  end

  def initialize(table_id, options = {})
    @table_id = table_id
    @table = Table.find(table_id)
    @game_hand = GameHand.where(table_id: table_id).order(:id).last
    @just_created = options[:just_created] || false
  end

  def just_actioned!
    @just_actioned = true
  end

  def next_action_player_id?(target_player_id)
    game_hand.player_id_by_seat_no(game_hand.current_seat_no) == target_player_id
  end

  def calc_winning_player_ids
    # 結果ラウンドにいる、マックしていないポット獲得権利保有者
    #   - 自身とAll-in以外が全員マックした場合は権利ある
    game_hand_players_in_result = game_hand.game_hand_players.select { |ghp|
      !ghp.folded? && ghp.effective_total_bet_amount > 0 && !ghp.muck_hand?
    }

    cards_by_player_id = {}
    game_hand_players_in_result.each do |ghp|
      cards_by_player_id[ghp.player_id] = [
        Poker::Card.new(ghp.card1_id),
        Poker::Card.new(ghp.card2_id)
      ]
    end
    board_cards = [
      Poker::Card.new(game_hand.board_card1_id),
      Poker::Card.new(game_hand.board_card2_id),
      Poker::Card.new(game_hand.board_card3_id),
      Poker::Card.new(game_hand.board_card4_id),
      Poker::Card.new(game_hand.board_card5_id),
    ]

    # 各プレイヤーのハンドの強さを評価
    result = {}
    cards_by_player_id.each do |player_id, cards|
      hand = Poker::HandEvaluator.new(cards + board_cards)
      hand.evaluate # ハンドを評価
      result[player_id] = { hand: hand }
    end

    # logging
    result.each do |player_id, hash|
      hand = hash[:hand]
      Rails.logger.debug(hand.msg)
    end

    best_player_ids = Set.new([cards_by_player_id.keys.first])

    # ハンドの強さに基づいて順位付け
    cards_by_player_id.each do |player_id, cards|
      target_hand = result[player_id][:hand]
      best_hand = result[best_player_ids.first][:hand]

      if target_hand.compare_with(best_hand) == 1 # win
        best_player_ids = Set.new([player_id])
      elsif target_hand.compare_with(best_hand) == 0 # tie
        best_player_ids << player_id
      end
    end

    best_player_ids.to_a
  end

  # ゲームが終了しているかどうか
  def hand_finished?
    # 結果ラウンドであることを確認
    return false unless current_state == 'result'

    # All-inプレイヤーがいるときはマックできない
    return true if game_hand.game_hand_players.any?(&:allin?)

    # All-inプレイヤーはマック出来ないので除外
    active_game_hand_players_in_result = game_hand
      .game_hand_players
      .select { |ghp| ghp.active? && ghp.effective_total_bet_amount > 0 }

    show_or_muck_by_player_id = {}
    active_game_hand_players_in_result.each do |ghp|
      if ghp.show_hand?
        show_or_muck_by_player_id[ghp.player_id] = true
      elsif ghp.muck_hand?
        show_or_muck_by_player_id[ghp.player_id] = false
      end
    end

    # 一人残して他全員マックした場合
    mucked_except_me = active_game_hand_players_in_result.select { |ghp|
      show_or_muck_by_player_id[ghp.player_id] == false
    }.size == active_game_hand_players_in_result.size - 1

    # 全員マックorショウの判断をし終えた場合
    all_player_mucked_or_showed = show_or_muck_by_player_id.keys.size == active_game_hand_players_in_result.size

    mucked_except_me || all_player_mucked_or_showed
  end

  # TODO: private

  def current_state
    # ゲームが開始されていない場合
    return 'init' if game_hand.nil?

    # 精算が終了した場合
    # ゲーム開始時にはブラインドが支払われているので、初期状態でfinishedになることはない。
    return 'finished' if game_hand.game_hand_players.sum(&:effective_total_bet_amount) == 0

    # まだ精算が完了していない場合
    # - サイドポットがある場合
    if game_hand.last_action.state == 'result' && game_hand.game_hand_players.sum(&:effective_total_bet_amount) > 0
      return 'result'
    end

    # 一人残して全員フォールドしている場合
    return 'result' if game_hand.folded_except_one?

    # 現在のラウンドが終了している場合
    if game_hand.last_action_finished_round?
      if game_hand.last_one_active_player?
        # 残りアクティブプレイヤーが一人だったら結果ラウンドへ
        return 'result'
      else
        # 次のラウンドへ突入
        return game_hand.next_state
      end
    end

    game_hand.last_action.state
  end

  def bb_seat_no
    if game_hand.seat_nos.size > 2
      GameUtils.sort_seat_nos(game_hand.seat_nos, game_hand.button_seat_no)[1]
    else
      game_hand.seat_nos.find { |seat_no| seat_no != game_hand.button_seat_no }
    end
  end

  def last_aggressive_seat_no
    return nil if game_hand.nil?
    return nil if game_hand.last_action_finished_round?

    last_aggressive_player_id = game_hand.all_actions.select do |action|
      action.state == current_state && (action.bet? || action.blind?)
    end.last&.player_id
    game_hand.table_player_by_player_id(last_aggressive_player_id)&.seat_no
  end

  def check_your_turn!(table_player)
    raise "This is not your turn" unless table_player.seat_no == game_hand.current_seat_no
  end
end
