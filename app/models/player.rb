class Player < ApplicationRecord
  has_many :table_players
  has_many :tables, through: :table_players

  def self.create_npc_player
    create!(nickname: 'AI', image_url: '', is_npc: true)
  end

  def profile_image_url
    # TOOD: 汚い。。。
    if image_url =~ /graph.facebook.com/
      uri = URI(image_url)
      new_query = URI.decode_www_form(uri.query || '') << ['width', '200']
      uri.query = URI.encode_www_form(new_query)
      uri.to_s
    else
      image_url
    end
  end
end
