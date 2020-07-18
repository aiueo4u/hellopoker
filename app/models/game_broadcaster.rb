# TODO: GameManagerからincludeされる前提
module GameBroadcaster
  def broadcast
    broadcaster = Broadcaster.new(self)
    broadcaster.broadcast_chip_channel
    broadcaster.broadcast_dealt_card_channel
    broadcaster.broadcast_room_viewer_channel
  end
end
