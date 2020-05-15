class CreateTablePlayerCommand
  include Command

  attr_reader :table, :current_player, :seat_no, :amount

  validate :validate_table

  def initialize(table_id:, current_player_id:, seat_no:, amount:)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
    @seat_no = seat_no
    @amount = amount
  end

  def run
    table.with_lock do
      raise ActiveRecord::Rollback if invalid?
      table.add_player(current_player, seat_no, amount)
    end

    if success?
      manager = GameManager.new(table.id, current_player.id)
      manager.broadcast
    end
  end

  private

  def validate_table
    errors.add(:table, :invalid) if TablePlayer.where(table_id: table.id, player_id: current_player.id).exists?
  end
end
