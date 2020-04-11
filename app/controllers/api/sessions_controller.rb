class Api::SessionsController < Api::ApplicationController
  def create
    nickname = params[:nickname] || SecureRandom.hex(4)
    player = Player.find_or_create_by(nickname: nickname)
    payload = { id: player.id }
    @jwt = AuthToken.encode(payload)
    session[:jwt] = @jwt
    @nickname = nickname
    @player_id = player.id
  end

  def destroy
    session.clear
  end
end
