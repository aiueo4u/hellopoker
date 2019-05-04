class NpcPlayer
  attr_reader :manager, :game_hand, :table_player

  def initialize(manager, game_hand, table_player)
    @manager = manager
    @game_hand = game_hand
    @table_player = table_player
  end

  def output
    type = 'PLAYER_ACTION_CHECK'
    amount = nil

    if manager.current_state == 'result'
      type = 'PLAYER_ACTION_SHOW_HAND'
    else
      # TODO
      current_round = manager.current_state
      current_round_actions = game_hand.all_actions.group_by(&:state)[current_round] || []

      # 本フェーズでの最高ベット額を取得
      amount_to_call = game_hand.amount_to_call_by_table_player(table_player)

      # 誰もベットしていない場合
      if current_round_actions.none?(&:bet?)
        # オリジナルがいないorオリジナルならば、70%の確率でベット
        if (!last_aggressive_player_id || last_aggressor?) && lot(70)
          type = 'PLAYER_ACTION_BET_CHIPS'
          amount = calc_bet(amount_to_call) # 1/2 pot bet
        end
      # 誰かがベットしていたら
      else
        weights = [
          ['PLAYER_ACTION_CALL', 80],
          ['PLAYER_ACTION_FOLD', 20],
        ]
        type = lot_by_weights(weights)
        case type
        when 'PLAYER_ACTION_CALL'
          amount = amount_to_call
        end
      end
    end

    [type, amount]
  end

  def calc_bet(amount_to_call)
    amount = amount_to_call + (amount_to_call + game_hand.pot_amount) / 2
    if amount % 10 != 0
      amount = (amount / 10) * 10
    end

    if amount > 1000
      amount = (amount / 100) * 100
    end
    amount
  end

  def lot_by_weights(weights)
    total = weights.map { |w| w[1] }.sum
    weights.each do |weight|
      if rand(total) < weight[1]
        return weight[0]
      else
        total -= weight[1]
      end
    end
    return weights[0][0]
  end

  def lot(prob)
    rand(100) < prob
  end

  def last_aggressor?
    last_aggressive_player_id == table_player.player_id
  end

  def last_aggressive_player_id
    unless @last_aggressive_player_id
      last_action_round = game_hand.state
      last_round_actions = game_hand.all_actions.group_by(&:state)[last_action_round]
      @last_aggressive_player_id = last_round_actions.select(&:bet?).sort_by(&:order_id).last&.player_id
    end
    @last_aggressive_player_id
  end
end
