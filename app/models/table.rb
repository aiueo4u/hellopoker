class Table < ApplicationRecord
  has_many :table_players
  has_many :players, through: :table_players
  has_many :table_messages
  has_many :game_hands
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

  def add_player_at_any_seat(player, stack)
    table_players.create!(
      player: player,
      seat_no: random_empty_seat,
      stack: stack,
      auto_play: player.is_npc,
    )
  end

  def random_empty_seat
    (1.upto(6).to_a - table_players.map(&:seat_no)).shuffle.first
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
