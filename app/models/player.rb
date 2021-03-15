class Player < ApplicationRecord
  has_many :table_players
  has_many :tables, through: :table_players
  has_many :other_service_accounts

  has_attached_file :profile_image
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  def self.create_npc_player(npc_type)
    profile = NpcPlayer.profile_by_npc_type[npc_type]
    create!(name: profile[:name], is_npc: true)
  end

  def profile_image_url
    profile_image? ? profile_image.url : ''
  end
end
