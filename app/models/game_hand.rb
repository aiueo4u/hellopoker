class GameHand < ApplicationRecord
  include ActionType

  belongs_to :table
  has_many :game_hand_players
  has_many :game_actions, autosave: true
  has_many :table_players, through: :table

  MAX_PLAYER_NUM = 6

  def last_action
    game_actions.sort_by(&:order_id).last
  end

  def next_action_timeout?
    GameAction.timeout_from_last_action?(last_action)
  end

  def last_action_seat_no
    game_hand_players.find { |ghp| ghp.player_id == last_action.player_id }.seat_no
  end

  def last_aggressive_seat_no
    return nil if last_action_finished_round?

    last_aggressive_player_id = game_actions.select do |action|
      action.state == current_state && (action.bet? || action.blind?)
    end.last&.player_id
    table_player_by_player_id(last_aggressive_player_id)&.seat_no
  end

  # このハンドに参加しているプレイヤーのシート番号の配列を返す
  def seat_nos
    game_hand_players.map(&:seat_no)
  end

  def sorted_seat_nos
    GameUtils.sort_seat_nos(seat_nos, last_action_seat_no)
  end

  # 一人以外全員フォールドしているかどうか
  def folded_except_one?
    game_hand_players.count(&:folded?) == game_hand_players.size - 1
  end

  def game_hand_player_by_seat_no(seat_no)
    game_hand_players.find { |ghp| ghp.seat_no == seat_no }
  end

  def active_player_by_seat_no?(seat_no)
    game_hand_player_by_seat_no(seat_no).active?
  end

  def table_player_by_player_id(player_id)
    table_players.find { |table_player| table_player.player_id == player_id }
  end

  def table_player_by_seat_no(seat_no)
    table_players.find { |table_player| table_player.seat_no == seat_no  }
  end

  def current_seat_table_player
    table_player_by_seat_no(current_seat_no)
  end

  # SB: 1, BB: 2, UTG: 3, ...
  def position_by_seat_no(seat_no)
    if seat_no > button_seat_no
      seat_no - button_seat_no
    else
      MAX_PLAYER_NUM - (button_seat_no - seat_no)
    end
  end

  # ミニマムベット額
  # TODO: 既にショートオールインが入っている場合への対応（ルールから確認）
  def amount_to_min_bet_by_player_id(player_id)
    amount_to_call_by_player_id(player_id) + prev_raise_amount
  end

  # 現在ラウンドでの最高ベット額
  def current_max_bet_amount
    game_hand_players.map { |ghp| ghp.bet_amount_by_state(last_action_state) }.max
  end

  # 現在ラウンドでの2番目のベット額
  def current_second_max_bet_amount
    game_hand_players.map { |ghp| ghp.bet_amount_by_state(last_action_state) }.sort[-2]
  end

  def prev_raise_amount
    [current_max_bet_amount - current_second_max_bet_amount, bb_size].max
  end

  # コールするのに実際に必要な額
  #   - ショートの場合や既にチップを出している場合などに応じる
  def amount_to_call_by_player_id(player_id)
    # 現在最高のベット額
    max_bet_amount = current_max_bet_amount

    # コールできる状況じゃなかったら0を戻す
    return 0 if max_bet_amount <= 0

    # 最低でもBB
    max_bet_amount = [max_bet_amount, bb_size].max

    current_game_hand_player = game_hand_player_by_id(player_id)
    amount_to_call = max_bet_amount - current_game_hand_player.bet_amount_by_state(last_action_state)

    [amount_to_call, current_game_hand_player.stack].min
  end

  # 現在のラウンド
  #   - preflop
  #   - flop
  #   - turn
  #   - river
  #   - hand_open: ハンドをショーするかマックするか
  #   - payment: 精算タイム（ユーザーには見えない。リクエスト処理中に一時的に発生）
  #   - finished: 終了（次回ゲームを開始できる）
  def current_state
    GameHand::CurrentState.calc_current_state(game_hand: self)
  end

  def last_action_state
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

  def build_taken_action(player_id, amount)
    game_actions << GameAction.build_taken_action(player_id, next_order_id, amount)
  end

  def build_blind_action(player_id, amount)
    game_actions << GameAction.build_blind_action(player_id, next_order_id, amount)
  end

  def build_fold_action(player_id, state)
    game_actions << GameAction.build_fold_action(player_id, state, next_order_id)
  end

  def build_check_action(player_id, state)
    game_actions << GameAction.build_check_action(player_id, state, next_order_id)
  end

  def build_call_action(player_id, amount, state)
    game_actions << GameAction.build_call_action(player_id, state, next_order_id, amount)
  end

  def build_bet_action(player, amount, state)
    game_actions << GameAction.build_bet_action(player, state, next_order_id, amount)
  end

  def build_show_action(player_id)
    game_actions << GameAction.build_show_action(player_id, next_order_id)
  end

  def build_muck_action(player_id)
    game_actions << GameAction.build_muck_action(player_id, next_order_id)
  end

  def game_hand_player_by_id(player_id)
    game_hand_players.find { |ghp| ghp.player_id == player_id }
  end

  def add_player_stack!(player_id, amount)
    game_hand_player_by_id(player_id).add_stack!(amount)
  end

  def board_cards
    @board_cards ||= [
      Poker::Card.new(board_card1_id),
      Poker::Card.new(board_card2_id),
      Poker::Card.new(board_card3_id),
      Poker::Card.new(board_card4_id),
      Poker::Card.new(board_card5_id),
    ]
  end

  # ショーダウン無しにゲームが終了？
  def skip_showdown?
    folded_except_one?
  end

  # 前回のアクションによって、そのアクションの属するラウンドを終了させたか？
  def last_action_finished_round?
    if last_action_state == 'preflop'
      return true if current_bb_used_option? # BBがオプションチェックをした場合
      return true if folded_except_one? # BB以外全員フォールドした場合
    end

    # アクティブなユーザーに関して、
    #   - blind以外のアクション
    #   - ベット額が同じ
    game_hand_players.filter(&:active?).all? do |ghp|
      last_action = ghp.last_action_by_state(last_action_state)
      last_action && !last_action.blind? && current_max_bet_amount == ghp.bet_amount_by_state(last_action_state)
    end
  end

  def game_actions_in_state(state)
    game_actions.filter { |action| action.state == state }
  end

  def current_bb_used_option?
    bb_ghp = game_hand_player_by_seat_no(bb_seat_no)
    game_actions_in_state('preflop').any? { |action| action.player_id == bb_ghp.player_id && action.check? }
  end

  def bb_seat_no
    GameUtils.sort_seat_nos(seat_nos, button_seat_no)[seat_nos.size > 2 ? 1 : 0]
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

  # 指定テーブルユーザーの順番かどうか？
  def turn_of?(table_player)
    table_player == current_seat_table_player
  end

  def current_seat_no
    return nil unless current_state.in?(%w(preflop flop turn river hand_open))

    if game_actions_in_state(current_state).blank?
      if current_state == 'hand_open'
        # ハンドオープン時はリバーのアグレッサーから
        aggressive_action = game_actions.filter { |action| action.river? && action.bet? }.sort_by(&:order_id).last
        return game_hand_player_by_id(aggressive_action.player_id).seat_no if aggressive_action
      end

      base_seat_no = button_seat_no
    else
      base_seat_no = last_action_seat_no
    end

    GameUtils.sort_seat_nos(seat_nos, base_seat_no).find do |seat_no|
      active_player_by_seat_no?(seat_no)
    end
  end

  def bb_seat_no
    if seat_nos.size > 2
      GameUtils.sort_seat_nos(seat_nos, button_seat_no)[1]
    else
      seat_nos.find { |seat_no| seat_no != button_seat_no }
    end
  end
end
