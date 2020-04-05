class Api::TablesController < Api::ApplicationController
  before_action :check_jwt

  def index
    table_players = TablePlayer.where(player_id: current_player.id).all.to_a
    @tables = Table.includes(:table_players).where(id: table_players.map(&:table_id)).to_a
    @player_by_id = Player.all.index_by(&:id)
  end

  def create
    @table = Table.create!(new_params)
  end

  private

  def new_params
    params.require(:table).permit(:name, :sb_size, :bb_size)
  end
end
