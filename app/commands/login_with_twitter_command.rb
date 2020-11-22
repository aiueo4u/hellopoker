class LoginWithTwitterCommand
  include Command

  attr_reader :auth_payload, :player

  def run
    tw_user = fetch_twitter_user

    osa = OtherServiceAccount.find_or_initialize_by(uid: tw_user.id, provider: :twitter)

    if osa.player_id.present?
      player = osa.player
    else
      player = Player.create!(nickname: tw_user.name)
      osa.player = player
      osa.save!
    end

    UploadProfileImageJob.perform_later(player: player, profile_image_url: tw_user.profile_image_url)

    @player = player
  end

  private

  def fetch_twitter_user
    klass = Struct.new(:id, :name, :profile_image_url)
    klass.new(
      auth_payload[:uid],
      auth_payload[:info][:nickname],
      auth_payload[:info][:image].gsub(/_normal/, ''),
    )
  end

  def initialize(auth_payload:)
    @auth_payload = auth_payload
  end
end
