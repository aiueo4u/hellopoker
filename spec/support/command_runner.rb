class CommandRunner
  attr_accessor :table

  def initialize(table)
    @table = table
  end

  def run(player_id, type, amount = nil)
    command = CreateGameActionCommand.run(table_id: table.id, current_player_id: player_id, type: type, amount: amount)
    unless command.success?
      raise "Command failed: player_id: #{player_id}, type: #{type}, amount: #{amount}"
    end
  end
end
