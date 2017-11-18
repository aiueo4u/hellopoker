class Admin::GameHandsController < Admin::ApplicationController
  def show
    @game_hand = GameHand.find(params[:id])
    @players_by_id = Player.where(id: @game_hand.game_actions.map(&:player_id).uniq).index_by(&:id)
  end
end
