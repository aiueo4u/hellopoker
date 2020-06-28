class Table < ApplicationRecord
  has_many :table_players
  has_many :players, through: :table_players
  has_many :table_messages
  belongs_to :tournament, optional: true

  validates :name, presence: true

  def add_player(player, seat_no, stack)
    table_players.create!(
      player_id: player.id,
      seat_no: seat_no,
      stack: stack,
    )
  end

  def add_npc_player(seat_no)
    player = Player.create_npc_player
    stack = current_bb_size * 100 # 100 BB Buy in
    table_players.create!(
      player_id: player.id,
      seat_no: seat_no,
      stack: stack,
      auto_play: true,
    )
  end

  def current_sb_size
    tournament? ? tournament.current_sb_size : sb_size
  end

  def current_bb_size
    tournament? ? tournament.current_bb_size : bb_size
  end

  def current_ante_size
    tournament? ? tournament.current_ante_size : 0
  end

  def tournament?
    tournament.present?
  end
end
