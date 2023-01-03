class Player::UploadProfileImageUseCase
  include UseCase

  attr_reader :player, :profile_image

  def initialize(player:, profile_image:)
    @player = player
    @profile_image = profile_image
  end

  def perform
    command = nil

    player.with_lock do
      command = Player::UpdateProfileImageCommand.run(
        player: player,
        profile_image: profile_image,
      )

      if !command.success?
        mark_error_and_rollback(:player)
      end
    end
  end
end
