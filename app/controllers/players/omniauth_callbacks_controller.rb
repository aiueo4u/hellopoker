class Players::OmniauthCallbacksController < ApplicationController
  def facebook
    result = LoginWithFacebookCommand.run(access_token: auth_payload['credentials']['token'])

    if result.success?
      player = result.player
      payload = { id: player.id }
      jwt = ::AuthToken.encode(payload)
      session[:jwt] = jwt
    end

    redirect_to root_path
  end

  def twitter
    result = LoginWithTwitterCommand.run(auth_payload: auth_payload)

    if result.success?
      player = result.player
      payload = { id: player.id }
      jwt = ::AuthToken.encode(payload)
      session[:jwt] = jwt
    end

    redirect_to root_path
  end

  private

  def auth_payload
    request.env['omniauth.auth']
  end
end
