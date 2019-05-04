class NpcPlayerJob < ApplicationJob
  queue_as :default

  def perform(game_hand_id, table_id, player_id)
    player = Player.find(player_id)
    logger.debug("Table: #{table_id}, Player: #{player.id}(#{player.nickname})")

    manager = GameManager.new(table_id, player_id, nil, nil, player_id, game_hand_id)
    game_hand = manager.game_hand
    table_player = game_hand.table_player_by_player_id(player_id)

    sleep 2

    type, amount = NpcPlayer.new(manager, game_hand, table_player).output

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
