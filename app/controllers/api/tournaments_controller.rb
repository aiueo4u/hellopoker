class Api::TournamentsController < Api::ApplicationController
  before_action :check_jwt

  def index
    @tournaments = Tournament.all
  end

  def show
    @tournament = Tournament.find(params[:id])
  end

  def create
    command = CreateTournamentCommand.run(name: params[:name])
    if command.success?
      @tournament = command.tournament
    else
      head :bad_request
    end
  end

  def start
    command = StartTournamentCommand.run(tournament_id: params[:id], current_player: current_player)
    head command.success? ? :created : :bad_request
  end
end
