class NpcPlayerJob < ApplicationJob
  queue_as :default

  def perform(game_hand_id, table_id, player_id)
    player = Player.find(player_id)
    logger.debug("Table: #{table_id}, Player: #{player.id}(#{player.nickname})")

    manager = GameManager.new(table_id, player_id, nil, nil, player_id, game_hand_id)
    game_hand = manager.game_hand
    table_player = game_hand.table_player_by_player_id(player_id)

    sleep 2

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

    ActiveRecord::Base.uncached do
      Table.transaction do
        Table.lock.find(table_id)
        GameHand.transaction do
          manager = GameManager.new(table_id, player_id, type, amount, player_id)
          if manager.next_action_player_id?(player_id)
            manager.do_action
          end
        end
      end
    end

    manager.broadcast

    if !manager.current_state.in?(['init', 'finished'])
      table_player = manager.game_hand.table_player_by_seat_no(manager.current_seat_no)
      if table_player.auto_play?
        NpcPlayerJob.perform_later(manager.game_hand.id, table_id, table_player.player_id)
      end
      TimeKeeperJob.perform_later(manager.game_hand.id, table_id, table_player.player_id, manager.game_hand.last_action.order_id)
    end
  end

  private

  def logger
   @logger ||= Rails.logger
  end
end
