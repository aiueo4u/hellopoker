class ChipChannel < ApplicationCable::Channel
  def subscribed
    table_id = params[:tableId]

    stream_from stream_name(table_id)

    # 接続が完了したら現在のゲーム情報を取得する
    # （他のプレイヤーにも送信してしまうがしょうがないか。。）
    manager = GameManager.new(table_id, nil, nil, nil, nil)
    manager.broadcast
  end

  def unsubscribed
  end

  def refresh
    table_id = params[:tableId]
    manager = GameManager.new(table_id, nil, nil, nil, nil)
    if manager.current_state == 'finished'
      return
    end

    Table.transaction do
      Table.lock.find(table_id)
      if manager.game_hand&.next_action_timeout?
        c_seat_no = manager.current_seat_no
        player_id = manager.game_hand.player_id_by_seat_no(c_seat_no)
        type = manager.current_state == 'result' ? 'PLAYER_ACTION_MUCK_HAND' : 'PLAYER_ACTION_FOLD'
        manager = GameManager.new(table_id, player_id, type, nil, nil)
        manager.do_action
        manager.broadcast
      end
    end
  end

  private

  def stream_name(table_id)
    "chip_channel_#{table_id}"
  end
end
