class SessionsController < ApplicationController
  # TODO: Facebook, Twitterでエンドポイント別にするとか
  def callback
    auth = request.env['omniauth.auth']
    other_service_account = OtherServiceAccount.find_or_initialize_by(uid: auth[:uid], provider: params[:provider])

    if other_service_account.player_id.present?
      player = Player.find(other_service_account.player_id)
      player.save!
    else
      nickname = auth[:info][:nickname] # Twitter
      nickname ||= auth[:info][:name] # Facebook
      player = Player.create!(nickname: nickname)
      other_service_account.player_id = player.id
      other_service_account.save!
    end

    UploadProfileImageJob.perform_later(player: player, profile_image_url: build_image_url(auth[:info][:image]))

    payload = { id: player.id }
    jwt = ::AuthToken.encode(payload)
    session[:jwt] = jwt

    redirect_to root_path
  end

  private

  def build_image_url(url)
    url
      .gsub(/^http:/, 'https:')
      .gsub(/_normal/, '') # for Twitter
  end
end
