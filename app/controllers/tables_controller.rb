class TablesController < ApplicationController
  before_action :check_jwt

  def index
    @tables = Table.includes(:table_players).all
    @player_by_id = Player.all.index_by(&:id)
  end

  def create
    @table = Table.create!(
      name: params[:table_name],
      sb_size: params[:sb].to_i,
      bb_size: params[:bb].to_i
    )
  end
end
