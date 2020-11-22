namespace :player do
  task copy_name: :environment do
    Player.find_each do |player|
      player.with_lock do
        player.name = player.name
        player.save!
      end
    end
  end

  task copy_profile_image_url: :environment do
    Player.find_each do |player|
      next if player.profile_image?
      next if player.image_url.blank?

      player.with_lock do
        player.profile_image = open(player.image_url)
        player.save!
      end
    end
  end
end
