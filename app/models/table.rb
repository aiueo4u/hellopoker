class Table < ApplicationRecord
  has_many :table_players
  has_many :players, through: :table_players
  has_many :table_messages

  validates :name, presence: true
  validates :sb_size, numericality: { greater_than: 0 }
  validates :bb_size, numericality: { greater_than: 0 }
  validate :validate_blind_size

  def add_player(player, seat_no, stack)
    table_players.create!(
      player_id: player.id,
      seat_no: seat_no,
      stack: stack,
    )
  end

  def add_npc_player(seat_no)
    player = Player.create_npc_player
    stack = bb_size * 100 # 100 BB Buy in
    table_players.create!(
      player_id: player.id,
      seat_no: seat_no,
      stack: stack,
      auto_play: true,
    )
  end

  private

  def validate_blind_size
    errors.add(:bb_size, 'がSBサイズよりも小さいです。') if sb_size > bb_size
  end
end
