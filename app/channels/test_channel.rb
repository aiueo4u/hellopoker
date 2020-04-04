class TestChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'test_channel'
  end

  def unsubscribed
  end
end
