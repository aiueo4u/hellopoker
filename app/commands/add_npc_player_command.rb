class AddNpcPlayerCommand
  include Command

  attr_reader :table, :current_player, :seat_no

  validate :validate_table

  def initialize(table_id:, current_player_id:, seat_no:)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
    @seat_no = seat_no
  end

  def run
    table.with_lock do
      raise ActiveRecord::Rollback if invalid?
      table.add_npc_player(seat_no)
    end

    if success?
      GameManager.broadcast_all(table.id)
    end
  end

  private

  def validate_table
    errors.add(:table, :invalid) if TablePlayer.where(table_id: table.id, seat_no: seat_no).exists?
  end
end
