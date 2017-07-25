class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def check_jwt
    begin
      @decoded = JWT.decode(player_jwt, nil, false)
    rescue => e
      return render json: {}, status: :unauthorized
    end
  end

  def current_player
    @current_player ||= Player.find(@decoded[0]['id'])
  end

  def player_jwt
    request.headers['HTTP_PLAYER_JWT']
  end
end
