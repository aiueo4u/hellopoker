class Api::ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :set_current_client_version_header

  private

  def set_current_client_version_header
    response.headers['Access-Control-Expose-Headers'] = 'Current-Client-Version'
    version = Rails.cache.fetch('current_client_version', expires_in: 1.minute) do
      ClientVersion.order(created_at: :desc).first&.version
    end
    response.headers['Current-Client-Version'] = version
  end

  def check_jwt
    begin
      @decoded = JWT.decode(session[:jwt], nil, false)
    rescue => e
      return render json: {}, status: :unauthorized
    end
  end

  def current_player
    @current_player ||= Player.find(@decoded[0]['id'])
  end
end
