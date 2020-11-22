class Player < ApplicationRecord
  has_many :table_players
  has_many :tables, through: :table_players

  has_attached_file :profile_image
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  def self.create_npc_player
    create!(name: 'AI', is_npc: true)
  end

  def profile_image_url
    profile_image? ? profile_image.url : ''
  end
end
