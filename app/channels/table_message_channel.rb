class TableMessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  def unsubscribed
  end

  private

  def stream_name
    "table_message_#{params[:tableId]}"
  end
end
