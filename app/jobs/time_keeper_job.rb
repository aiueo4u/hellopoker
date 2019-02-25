class TimeKeeperJob < ApplicationJob
  queue_as :default

  def perform(game_hand_id, table_id, player_id, action_order_id)
    Rails.logger.debug('time keeper job')

    manager = GameManager.new(table_id, player_id, nil, nil, player_id, game_hand_id)
    game_hand = manager.game_hand

    while !game_hand.next_action_timeout? do
      Rails.logger.debug('waiting...')
      sleep 1
    end

    Table.transaction do
      Table.lock.find(table_id)
      current_seat_no = manager.current_seat_no
      return unless current_seat_no # nilなら不要なジョブになっている

      player_id = game_hand.player_id_by_seat_no(current_seat_no)
      # TODO: checkable?
      type = manager.current_state == 'result' ? 'PLAYER_ACTION_MUCK_HAND' : 'PLAYER_ACTION_FOLD'
      manager = GameManager.new(table_id, player_id, type, nil, player_id, game_hand_id)

      action_order_id ||= 0
      if manager.game_hand.next_order_id == action_order_id + 1
        manager.do_action
        manager.broadcast
        Rails.logger.debug("Player #{player_id} ${type}")
      else
        Rails.logger.debug('stale job')
      end
    end
  end
end
