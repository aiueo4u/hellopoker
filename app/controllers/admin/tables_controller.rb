class Admin::TablesController < Admin::ApplicationController
  def destroy
    table = Table.find(params[:id])

    Table.transaction do
      table = Table.lock.find(table.id)
      game_hands = GameHand.where(table_id: table.id).to_a
      GameHandPlayer.where(game_hand_id: game_hands.map(&:id)).delete_all
      GameAction.where(game_hand_id: game_hands.map(&:id)).delete_all
      game_hands.each(&:destroy!)
      table.destroy!
    end

    redirect_to request.referrer
  end
end
