class TimeKeeperJob < ApplicationJob
  queue_as :default

  def perform(game_hand_id, table_id, player_id, action_order_id)
    Rails.logger.debug('time keeper job')

    Rails.logger.debug("TableID: #{table_id}, Game: #{game_hand_id}, PlayerID: #{player_id}(#{Player.find(player_id).nickname}), OrderID: #{action_order_id}")

    ActiveRecord::Base.uncached do
      action_order_id ||= 0
      manager = GameManager.new(table_id, player_id, nil, nil, player_id, game_hand_id)

      game_hand = GameHand.find(game_hand_id)
      waiting_time = 0
      # 再帰的にenqueueした場合、まだトランザクションが未コミットの状態でここに来うるため、
      # アクション数をみてポーリングさせる
      while game_hand.last_action.order_id < action_order_id || !game_hand.next_action_timeout? do
        Rails.logger.debug('waiting...')
        sleep 1
        waiting_time += 1
        if waiting_time % 5 == 0
          gm = GameManager.new(table_id, player_id, nil, nil, player_id, game_hand_id)
          if !gm.current_seat_no
            Rails.logger.debug('stale job: no current_seat_no')
            return
          end

          if game_hand.next_order_id != action_order_id + 1
            Rails.logger.debug('stale job: invalid order id')
            return
          end
        end

        game_hand = GameHand.find(game_hand_id)
      end

      Table.transaction do
        Table.lock.find(table_id)
        current_seat_no = manager.current_seat_no
        return unless current_seat_no # nilなら不要なジョブになっている

        player_id = game_hand.player_id_by_seat_no(current_seat_no)

        table_player = game_hand.table_player_by_player_id(player_id)
        if manager.current_state == 'result'
          type = 'PLAYER_ACTION_MUCK_HAND'
        else
          type = 'PLAYER_ACTION_FOLD'
        end
        manager = GameManager.new(table_id, player_id, type, nil, player_id, game_hand_id)

        if manager.game_hand.next_order_id == action_order_id + 1
          manager.do_action
          manager.broadcast

          if !manager.current_state.in?(['init', 'finished'])
            table_player = manager.game_hand.table_player_by_seat_no(manager.current_seat_no)
            if table_player.auto_play?
              NpcPlayerJob.perform_later(game_hand.id, table_id, table_player.player_id)
            end
            TimeKeeperJob.perform_later(game_hand.id, table_id, table_player.player_id, action_order_id + 1)
          end
          Rails.logger.debug("Player #{player_id} #{type}")
        else
          Rails.logger.debug('stale job')
        end
      end
    end
  end
end
