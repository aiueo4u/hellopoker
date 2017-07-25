class ChipChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name

    # 接続が完了したら現在のゲーム情報を取得する
    # （他のプレイヤーにも送信してしまうがしょうがないか。。）
    broadcast_game_state

    game_hand = GameHand.where(table_id: params[:tableId]).order(id: :desc).first
    if game_hand&.state == 'result'
      ActionCableBroadcaster.broadcast_game_result(game_hand)
    end
  end

  def unsubscribed
  end

  private

  def stream_name
    "chip_channel_#{params[:tableId]}"
  end

  def broadcast_game_state
    ActionCableBroadcaster.broadcast_game_state(params[:tableId])
  end
end
