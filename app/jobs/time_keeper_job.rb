class TimeKeeperJob < ApplicationJob
  queue_as :default

  def perform(table_id, player_id, action_order_id)
    # return if Rails.env.development?

    Rails.logger.debug('time keeper job')

    Rails.logger.debug("TableID: #{table_id}, PlayerID: #{player_id}(#{Player.find(player_id).nickname}), OrderID: #{action_order_id}")

    ActiveRecord::Base.uncached do
      action_order_id ||= 0
      manager = GameManager.new(table_id)
      game_hand = manager.game_hand

      waiting_time = 0
      # 再帰的にenqueueした場合、まだトランザクションが未コミットの状態でここに来うるため、
      # アクション数をみてポーリングさせる
      while game_hand.last_action.order_id < action_order_id || !game_hand.next_action_timeout? do
        Rails.logger.debug('waiting...')
        sleep 1
        waiting_time += 1
        if waiting_time % 5 == 0
          gm = GameManager.new(table_id)
          if !gm.game_hand.current_seat_no
            Rails.logger.debug('stale job: no current_seat_no')
            return
          end

          if game_hand.next_order_id != action_order_id + 1
            Rails.logger.debug('stale job: invalid order id')
            return
          end
        end

        game_hand.reload
      end

      Table.transaction do
        Table.lock.find(table_id)
        current_seat_no = manager.game_hand.current_seat_no
        return unless current_seat_no # nilなら不要なジョブになっている

        player_id = game_hand.player_id_by_seat_no(current_seat_no)

        # タイムアウトカウント+1
        table_player = game_hand.table_player_by_player_id(player_id)
        table_player.timeout_count += 1
        table_player.save!

        if manager.current_state == 'result'
          type = 'PLAYER_ACTION_MUCK_HAND'
        else
          type = 'PLAYER_ACTION_FOLD'
        end

        manager = GameManager.new(table_id)

        if manager.game_hand.next_order_id == action_order_id + 1
          CreateGameActionCommand.run(
            table_id: table_id,
            current_player_id: player_id,
            type: type,
            skip_timeout_count_reset: true,
          )

          Rails.logger.debug("Player #{player_id} #{type}")
        else
          Rails.logger.debug('stale job')
        end
      end
    end
  end
end
