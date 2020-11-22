class LoginWithFacebookCommand
  include Command

  attr_reader :access_token, :player

  validate :validate_access_token

  def run
    return if invalid?

    fb_user = fetch_facebook_user

    player = nil

    Player.transaction do
      osa = OtherServiceAccount.find_or_initialize_by(uid: fb_user.id, provider: :facebook)

      if osa.player_id.present?
        player = osa.player
      else
        player = Player.create!(name: fb_user.name)
        osa.player = player
        osa.save!
      end

      if !player.profile_image?
        UploadProfileImageJob.perform_later(player: player, profile_image_url: fb_user.profile_image_url)
      end
    end

    @player = player
  end

  private

  def initialize(access_token:)
    @access_token = access_token
  end

  def fetch_facebook_user
    me = client.get_object('me?fields=id,name,email,picture.width(640)', local: 'ja_JP')

    klass = Struct.new(:id, :name, :profile_image_url)
    klass.new(
      me['id'],
      me['name'],
      me['picture']['data']['url']
    )
  end

  def client
    @client ||= FacebookClient.get_user_client(access_token)
  end

  def validate_access_token
    errors.add(:access_token, :invalid)  if !FacebookClient.valid_access_token?(access_token)
  end
end
