class RoomViewerChannel < ApplicationCable::Channel
  def subscribed
    table = Table.find(params[:tableId])
    stream_from stream_name(table.id)

    # 接続が完了したら現在のゲーム情報を取得する
    # （他のプレイヤーにも送信してしまうがしょうがないか。。）
    manager = GameManager.new(table.id)
    manager.broadcast
  end

  private

  def stream_name(table_id)
    "room_viewer_channel_#{table_id}"
  end
end
