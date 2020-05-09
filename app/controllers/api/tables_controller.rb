class Api::TablesController < Api::ApplicationController
  before_action :check_jwt

  def index
    @tables = current_player.tables.includes(:players)
  end

  def create
    @table = Table.create!(new_params)
  end

  private

  def new_params
    params.require(:table).permit(:name, :sb_size, :bb_size)
  end
end
