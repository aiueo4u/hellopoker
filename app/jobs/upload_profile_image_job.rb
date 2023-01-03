class UploadProfileImageJob < ApplicationJob
  def perform(args)
    player = args[:player]
    profile_image = URI.open(args[:profile_image_url])

    player.with_lock do
      player.profile_image = profile_image
      player.save!
    end
  end
end
