class SessionsController < ApplicationController
  # TODO: Facebook, Twitterでエンドポイント別にするとか
  def callback
    auth = request.env['omniauth.auth']
    other_service_account = OtherServiceAccount.find_or_initialize_by(uid: auth[:uid], provider: params[:provider])

    if other_service_account.player_id.present?
      player = Player.find(other_service_account.player_id)
      player.image_url = build_image_url(auth[:info][:image])
      player.save!
    else
      nickname = auth[:info][:nickname] # Twitter
      nickname ||= auth[:info][:name] # Facebook
      player = Player.create!(nickname: nickname, image_url: build_image_url(auth[:info][:image]))
      other_service_account.player_id = player.id
      other_service_account.save!
    end

    payload = { id: player.id }
    jwt = ::AuthToken.encode(payload)
    redirect_to "#{Rails.configuration.x.redirect_url_after_login}?jwt=#{jwt}"
  end

  private

  def build_image_url(url)
    url
      .gsub(/^http:/, 'https:')
      .gsub(/_normal/, '') # for Twitter
  end
end
