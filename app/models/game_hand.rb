class GameHand < ApplicationRecord
  include ActionType

  belongs_to :table
  has_many :game_hand_players
  has_many :game_actions, autosave: true

  MAX_PLAYER_NUM = 6

  def self.create_new_game(table)
    game_hand = self.new(
      table_id: table.id,
      sb_size: table.current_sb_size,
      bb_size: table.current_bb_size,
      ante_size: table.current_ante_size,
    )
    deck = Poker::Deck.new

    # TODO: validate active table player exists

    # スタックがあるプレイヤーのみ参加
    #   - カードも配る
    joining_table_players = table.table_players.filter(&:can_play_next_game?).sort_by(&:seat_no)
    joining_table_players.each do |table_player|
      game_hand.game_hand_players.build(
        player_id: table_player.player_id,
        initial_stack: table_player.stack,
        card1_id: deck.draw.id,
        card2_id: deck.draw.id,
      )
    end

    # ボードのカードを決めちゃう
    game_hand.board_card1_id = deck.draw.id
    game_hand.board_card2_id = deck.draw.id
    game_hand.board_card3_id = deck.draw.id
    game_hand.board_card4_id = deck.draw.id
    game_hand.board_card5_id = deck.draw.id

    # ボタンポジションの決定
    last_button_seat_no = self.where(table_id: table.id).order(:id).last&.button_seat_no || joining_table_players[-1].seat_no
    # btn, sb, bb, ...
    sorted_seat_nos = GameUtils.sort_seat_nos(joining_table_players.map(&:seat_no), last_button_seat_no)
    game_hand.button_seat_no = sorted_seat_nos[0]

    # SB,BBのシート番号
    if sorted_seat_nos.size == 2 # Heads up
      sb_seat_no = sorted_seat_nos[0]
      bb_seat_no = sorted_seat_nos[1]
    else
      sb_seat_no = sorted_seat_nos[1]
      bb_seat_no = sorted_seat_nos[2]
    end

    # SB,BBからブラインド徴収
    sb_table_player = joining_table_players.find { |tp| tp.seat_no == sb_seat_no }
    sb_amount = [game_hand.sb_size, sb_table_player.stack].min
    sb_table_player.stack -= sb_amount
    game_hand.build_blind_action(sb_table_player.player_id, sb_amount)

    bb_table_player = joining_table_players.find { |tp| tp.seat_no == bb_seat_no }
    bb_amount = [game_hand.bb_size, bb_table_player.stack].min
    bb_table_player.stack -= bb_amount
    game_hand.build_blind_action(bb_table_player.player_id, bb_amount)

    sb_table_player.save!
    bb_table_player.save!
    game_hand.save!
  end

  def last_action
    game_actions.sort_by(&:order_id).last
  end

  def next_action_timeout?
    GameAction.timeout_from_last_action?(last_action)
  end

  def last_action_seat_no
    game_hand_players.find { |ghp| ghp.player_id == last_action.player_id }.seat_no
  end

  # このハンドに参加しているプレイヤーのシート番号の配列を返す
  def seat_nos
    game_hand_players.map(&:seat_no)
  end

  def sorted_seat_nos
    GameUtils.sort_seat_nos(seat_nos, last_action_seat_no)
  end

  def player_id_by_seat_no(seat_no)
    game_hand_players.find { |ghp| ghp.seat_no == seat_no }&.player_id
  end

  # 一人以外全員フォールドしているかどうか
  def folded_except_one?
    game_hand_players.count(&:folded?) == game_hand_players.size - 1
  end

  # folded_except_one?と何が違うんだっけ・・・
  def last_one_active_player?
    game_hand_players.count(&:active?) <= 1
  end
  
  def next_state
    next_state_index = GameAction.states[last_action.state] + 1
    GameAction.states.keys[next_state_index]
  end

  def active_player_by_seat_no?(seat_no)
    game_hand_player_by_seat_no(seat_no).active?
  end

  def allin_player_by_seat_no?(seat_no)
    game_hand_player_by_seat_no(seat_no).allin?
  end

  def folded_player_by_seat_no?(seat_no)
    game_hand_player_by_seat_no(seat_no).folded?
  end

  def participating_player?(player_id)
  end

  def table_players
    @table_players ||= TablePlayer.where(table_id: self.table_id).to_a
  end

  def table_player_by_player_id(player_id)
    table_players.find { |table_player| table_player.player_id == player_id }
  end

  def table_player_by_seat_no(seat_no)
    table_players.find { |table_player| table_player.seat_no == seat_no  }
  end

  def position_by_seat_no(seat_no)
    if seat_no > button_seat_no
      seat_no - button_seat_no
    else
      MAX_PLAYER_NUM - (button_seat_no - seat_no)
    end
  end

  def amount_to_call_by_player_id(player_id)
    max_bet_amount = game_hand_players.map { |ghp| ghp.bet_amount_by_state(state) }.max
    current_game_hand_player = game_hand_player_by_id(player_id)
    [max_bet_amount - current_game_hand_player.bet_amount_by_state(state), current_game_hand_player.stack].min
  end

  def all_actions
    self.game_actions
  end

  # もうこれ以上プレイヤーのアクションがないか？
  #   - resultのShow or Muckまでがアクション
  def no_more_action?
    game_hand_players.all? { |ghp| ghp.allin? || ghp.folded? || ghp.last_action&.result? }
  end

  # preflop
  # flop
  # turn
  # river
  # hand_open: ハンドをショーするかマックするか
  # payment(result): 精算タイム
  # finished: 終了（次回ゲームを開始できる）
  def current_state
    # 全員のアクションが終了
    if no_more_action?
      # finished: 全て終了した場合
      #   - 精算が終わったら実効ベット額が全員0になる
      # payment: 精算タイム
      #   - 生産するべき実効ベット額がある
      return game_hand_players.sum(&:effective_total_bet_amount) > 0 ? 'payment' : 'finished'
    end

    last_action_finished_round? ? next_state : last_action.state
  end

  # TODO
  def state
    last_action.state
  end

  def dump_result_actions
    actions_by_player_id = self.game_actions.select(&:taken?).group_by(&:player_id)

    dumped = {}

    actions_by_player_id.each do |player_id, actions|
      amount_diff = actions.sum(&:amount)
      dumped[player_id] = {
        'amount_diff' => amount_diff,
      }
    end

    dumped
  end

  def pot_amount
    game_hand_players.sum(&:effective_total_bet_amount)
  end

  def next_order_id
    game_actions.size + 1
  end

  def build_taken_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:taken],
      amount: amount
    )
  end

  def build_blind_action(player_id, amount)
    game_actions.build(
      order_id: next_order_id,
      state: 'preflop',
      player_id: player_id,
      action_type: self.class.action_types[:blind],
      amount: amount
    )
  end

  def build_fold_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:fold]
    )
  end

  def build_check_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:check]
    )
  end

  def build_call_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:call],
      amount: amount
    )
  end

  def build_bet_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:bet],
      amount: amount
    )
  end

  def build_show_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:show],
    )
  end

  def build_muck_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:muck],
    )
  end

  def min_total_bet_amount_in_not_folded_players
    game_hand_players
      .reject(&:folded?)
      .map(&:effective_total_bet_amount)
      .filter { |amount| amount > 0 }
      .min
  end

  def game_hand_player_by_seat_no(seat_no)
    game_hand_players.find { |ghp| ghp.seat_no == seat_no }
  end

  def game_hand_player_by_id(player_id)
    game_hand_players.find { |ghp| ghp.player_id == player_id }
  end

  def add_player_stack!(player_id, amount)
    game_hand_player_by_id(player_id).add_stack!(amount)
  end

  def create_taken_actions(winning_player_ids, current_state)
    min_total_bet_amount_in_not_folded_players = self.min_total_bet_amount_in_not_folded_players

    game_hand_players.each do |ghp|
      next unless ghp.effective_total_bet_amount > 0
      amount = [min_total_bet_amount_in_not_folded_players, ghp.effective_total_bet_amount].min

      # 取得版
      chopped_amount = (amount / winning_player_ids.size).to_i # TOOD: 割り切れないときの誤差調整
      winning_player_ids.each do |winning_player_id|
        self.build_taken_action(winning_player_id, chopped_amount, current_state)
        self.add_player_stack!(winning_player_id, chopped_amount)
      end

      # 奪われた版
      self.build_taken_action(ghp.player_id, -1 * amount, current_state)
    end

    self.save!
  end

  # ショーダウン無しにゲームが終了？
  def skip_showdown?
    folded_except_one?
  end

  # 前回のアクションによって、そのアクションの属するラウンドを終了させたか？
  def last_action_finished_round?
    last_round_actions = game_actions.filter { |action| action.state == last_action.state }
    last_aggressive_player_id = last_round_actions.filter(&:bet?).sort_by(&:order_id).last&.player_id
    last_aggressive_game_hand_player = game_hand_player_by_id(last_aggressive_player_id)

    # アグレッサーがいる場合（ブラインドはベットではない）
    if last_aggressive_game_hand_player
      # 全員が下記のいずれかを満たす場合、true
      #   - オールイン
      #   - フォールド
      #   - コール（アグレッサーと同額出している）
      return game_hand_players.all? do |ghp|
        ghp.allin? ||
          ghp.folded? ||
          ghp.bet_amount_by_state(state) == last_aggressive_game_hand_player.bet_amount_by_state(state)
      end
    end

    if state == 'preflop'
      return true if current_bb_used_option? # BBがオプションチェックをした場合
      return true if folded_except_one? # BB以外全員フォールドした場合
    end

    # 全員チェックorフォールドの場合のみtrue
    game_hand_players.filter(&:active?).all? do |ghp|
      last_action = ghp.last_action_by_state(state)
      last_action && (last_action.check? || last_action.fold?)
    end
  end

  def game_actions_in_state(state)
    game_actions.filter { |action| action.state == state }
  end

  def current_bb_used_option?
    bb_ghp = game_hand_player_by_seat_no(bb_seat_no)
    game_actions_in_state('preflop').any? { |action| action.player_id == bb_ghp.player_id && !action.blind? }
  end

  def bb_seat_no
    GameUtils.sort_seat_nos(seat_nos, button_seat_no)[seat_nos.size > 2 ? 1 : 0]
  end

  def next_active_seat_no
    sorted_seat_nos.find { |seat_no| active_player_by_seat_no?(seat_no) }
  end

  def checkable_by?(table_player)
    return false unless current_state.in?(%w(preflop flop turn river))
    no_bet_action = game_actions_in_state(current_state).none?(&:bet?)

    # preflopではBBのオプションチェック時のみ
    if current_state == 'preflop'
      # BBで他の誰もベットしていないときチェックできる
      table_player.seat_no == bb_seat_no && no_bet_action
    else
      # まだ誰もベットしていないときチェックできる
      no_bet_action
    end
  end

  def current_seat_no
    return nil unless current_state.in?(%w(preflop flop turn river result)) # TODO: result -> hand_open

    if game_actions_in_state(current_state).blank?
      if current_state == 'result'
        # ハンドオープン時はリバーのアグレッサーから
        aggressive_action = game_actions.filter { |action| action.river? && action.bet? }.sort_by(&:order_id).last
        return game_hand_player_by_id(aggressive_action.player_id).seat_no if aggressive_action
      end

      base_seat_no ||= button_seat_no
    else
      base_seat_no = last_action_seat_no
    end

    GameUtils.sort_seat_nos(seat_nos, base_seat_no).find do |seat_no|
      active_player_by_seat_no?(seat_no)
    end
  end
end
