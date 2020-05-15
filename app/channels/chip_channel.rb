class ChipChannel < ApplicationCable::Channel
  def subscribed
    table_id = params[:tableId]

    stream_from stream_name(table_id)

    # 接続が完了したら現在のゲーム情報を取得する
    # （他のプレイヤーにも送信してしまうがしょうがないか。。）
    manager = GameManager.new(table_id, nil)
    manager.broadcast
  end

  def unsubscribed
  end

  private

  def stream_name(table_id)
    "chip_channel_#{table_id}"
  end
end
