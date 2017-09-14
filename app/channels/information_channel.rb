class InformationChannel < ApplicationCable::Channel
  def subscribed
    stream_from InformationBroadcaster.stream_name(table_id)
    # TOOD: チャットエリアを新設してそちらに移行
    # InformationBroadcaster.broadcast_entering(table_id, current_player)
  end

  def unsubscribed
    # InformationBroadcaster.broadcast_leaving(table_id, current_player)
  end

  private

  def table_id
    params[:tableId]
  end
end
