class Admin::GameHandsController < Admin::ApplicationController
  def show
    @game_hand = GameHand.find(params[:id])
    @players_by_id = Player.where(id: @game_hand.game_actions.map(&:player_id).uniq).index_by(&:id)
    @table_players_by_player_id = TablePlayer.where(table_id: @game_hand.table_id).index_by(&:player_id)
  end
end
