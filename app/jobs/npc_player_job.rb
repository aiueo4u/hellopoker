class NpcPlayerJob < ApplicationJob
  queue_as :default

  def perform(table_id, player_id)
    sleep 2 # 敢えてスリープして思考時間を表現

    type, amount = NpcPlayer.new(table_id, player_id).output

    Rails.logger.debug("[NPC Action] #{type}: #{amount}")

    command = CreateGameActionCommand.run(
      table_id: table_id,
      current_player_id: player_id,
      type: type,
      amount: amount,
    )

    if !command.success?
      logger.debug("[NPC Action Failed] #{player_id}:#{type}:#{amount}")
    end
  end

  private

  def logger
   @logger ||= Rails.logger
  end
end
