class Player::UpdateProfileImageCommand
  include Command

  attr_reader :player, :profile_image

  def initialize(player:, profile_image:)
    @player = player
    @profile_image = profile_image
  end

  def run
    player.profile_image = profile_image
    player.save!
  end
end
