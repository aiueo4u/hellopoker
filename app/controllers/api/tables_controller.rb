class Api::TablesController < Api::ApplicationController
  before_action :check_jwt

  def index
    @tables = current_player.tables.includes(:players)
  end

  def create
    command = CreateTableCommand.run(
      name: new_params[:name],
      sb_size: new_params[:sb_size],
      bb_size: new_params[:bb_size],
    )

    if command.success?
      @table = command.table
    else
      head :bad_request
    end
  end

  private

  def new_params
    params.require(:table).permit(:name, :sb_size, :bb_size)
  end
end
