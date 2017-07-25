class SessionsController < ApplicationController
  def create
    nickname = params[:nickname] || SecureRandom.hex(4)
    player = Player.find_or_create_by(nickname: nickname)
    payload = { id: player.id }
    @jwt = AuthToken.encode(payload)
    @nickname = nickname
    @player_id = player.id
  end
end
