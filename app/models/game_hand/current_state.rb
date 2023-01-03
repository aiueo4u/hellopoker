class GameHand::CurrentState
  attr_reader :game_hand, :game_hand_players, :last_action_state

  def self.calc_current_state(**args)
    new(**args).calc_current_state
  end

  def calc_current_state
    if no_more_action?
      game_hand_players.sum(&:effective_total_bet_amount) > 0 ? 'payment' : 'finished'
    elsif last_action_finished_round?
      next_state
    else
      last_action_state
    end
  end

  def initialize(game_hand:)
    @game_hand = game_hand
    @game_hand_players = game_hand.game_hand_players
    @last_action_state = game_hand.last_action_state
  end

  private

  # 現在のハンドで全てのプレイヤーアクションを終えているかどうか(paymentラウンドに進めるかどうか)
  def no_more_action?
    # ゲーム終了状態の場合（finishの次はnil）
    return true if next_state.nil?

    # 全員アクションを終えている場合
    #   - 例: ハンドショーまで全部終わった場合
    return true if game_hand_players.all?(&:no_more_action?)

    # 1人以外全員fold or muck状態
    #   - 例: 全員降りた場合
    return true if game_hand_players.count { |ghp| !ghp.folded? && !ghp.muck_hand? } == 1

    # 自分以外の全員がアクションを終えており、必要なチップを出している場合→hand_openへ
    #   - 例: 自分がBBで、BTNまで全員フォールド、SBがオールインしてきた場合
    return true if game_hand_players.count(&:no_more_action?) == game_hand_players.size - 1 &&
      game_hand_players.count { |ghp| ghp.active? && ghp.bet_amount_by_state(last_action_state) >= game_hand.current_max_bet_amount } == 1

    # オールインしているプレイヤーがいる場合は、hand_openラウンドをスキップしてno more action扱いにする
    #   - 例: オールインしているプレイヤーを含んだ状態で、リバーのアクションが終わった場合
    return true if last_action_finished_round? && next_state == 'hand_open' && game_hand_players.any?(&:allin?)

    false
  end

  def next_state
    next_state_index = GameAction.states[last_action_state] + 1
    GameAction.states.keys[next_state_index]
  end

  def last_action_finished_round?
    game_hand.last_action_finished_round?
  end
end
