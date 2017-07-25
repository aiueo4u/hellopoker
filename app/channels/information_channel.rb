class InformationChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name

    broadcast_data = {
      type: 'info',
      info_type: 'entered',
      nickname: current_player.nickname,
      time: Time.current.strftime('%Y/%m/%d %H:%M'),
    }
    ActionCable.server.broadcast stream_name, broadcast_data
  end

  def unsubscribed
    broadcast_data = {
      type: 'info',
      info_type: 'leaving',
      nickname: current_player.nickname,
      time: Time.current.strftime('%Y/%m/%d %H:%M'),
    }
    ActionCable.server.broadcast stream_name, broadcast_data
  end

  def info(data)
    broadcast_data = data.merge(type: 'info', time: Time.current.strftime('%Y/%m/%d %H:%M'))
    ActionCable.server.broadcast stream_name, broadcast_data
  end

  private

  def stream_name
    "information_channel_#{params[:tableId]}"
  end
end
