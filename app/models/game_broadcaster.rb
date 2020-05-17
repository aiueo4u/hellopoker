# TODO: GameManagerからincludeされる前提
module GameBroadcaster
  def broadcast
    broadcaster = Broadcaster.new(self)
    broadcaster.broadcast_chip_channel
    broadcaster.broadcast_dealt_card_channel
  end
end
