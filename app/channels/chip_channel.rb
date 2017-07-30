class ChipChannel < ApplicationCable::Channel
  def subscribed
    table_id = params[:tableId]

    stream_from stream_name(table_id)

    # 接続が完了したら現在のゲーム情報を取得する
    # （他のプレイヤーにも送信してしまうがしょうがないか。。）
    broadcast_game_state(table_id)

    game_hand = GameHand.where(table_id: table_id).order(id: :desc).first
    if game_hand&.state == 'result'
      ActionCableBroadcaster.broadcast_game_result(game_hand)
    end
  end

  def unsubscribed
  end

  private

  def stream_name(table_id)
    "chip_channel_#{table_id}"
  end

  def broadcast_game_state(table_id)
    ActionCableBroadcaster.broadcast_game_state(table_id)
  end
end
