class NpcPlayer
  def self.output(manager, game_hand, table_player)
    type = 'PLAYER_ACTION_FOLD'
    amount = nil

    if manager.current_state == 'result'
      type = 'PLAYER_ACTION_SHOW_HAND'
    else
      # TODO
      current_round = manager.current_state
      current_round_actions = game_hand.all_actions.group_by(&:state)[current_round] || []

      # 本フェーズでの最高ベット額を取得
      amount_to_call = game_hand.amount_to_call_by_table_player(table_player)

      # 誰もベットしていないなら50%の確率でベット
      if current_round_actions.blank? || current_round_actions.none?(&:bet?)
        if rand(100) < 50
          type = 'PLAYER_ACTION_BET_CHIPS'
          # 1/2 pot bet
          amount = amount_to_call + (amount_to_call + game_hand.pot_amount) / 2
          if amount % 10 != 0
            amount = (amount / 10) * 10
          end

          if amount > 1000
            amount = (amount / 100) * 100
          end
        else
          type = 'PLAYER_ACTION_CHECK'
        end
      else
        # 誰かがベットしていたら50%の確率でコール
        if rand(100) < 50
          type = 'PLAYER_ACTION_CALL'
          amount = amount_to_call
        else
          type = 'PLAYER_ACTION_FOLD'
        end
      end
    end

    [type, amount]
  end
end
