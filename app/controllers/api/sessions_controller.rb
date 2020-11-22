class Api::SessionsController < Api::ApplicationController
  def create
    name = params[:name] || SecureRandom.hex(4)
    player = Player.find_or_create_by(name: name)
    payload = { id: player.id }
    jwt = AuthToken.encode(payload)
    session[:jwt] = jwt
    @name = name
    @player_id = player.id
  end

  def destroy
    session.clear
  end
end
