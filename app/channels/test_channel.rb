class TestChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'test_channel'

    data = { from: current_player.id, name: current_player.nickname, type: 'JOIN_ROOM' }
    ActionCable.server.broadcast 'test_channel', data
  end
end
