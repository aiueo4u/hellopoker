class NpcPlayerJob < ApplicationJob
  queue_as :default

  def perform(table_id, player_id)
    sleep 2 # 敢えてスリープして思考時間を表現

    type, amount = NpcPlayer.new(table_id, player_id).output

    CreateGameActionCommand.run(
      table_id: table_id,
      current_player_id: player_id,
      type: type,
      amount: amount,
    )
  end

  private

  def logger
   @logger ||= Rails.logger
  end
end
