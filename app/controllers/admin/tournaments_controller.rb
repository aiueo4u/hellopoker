class Admin::TournamentsController < Admin::ApplicationController
  def index
    @tournaments = Tournament.all
  end

  def show
    @tournament = Tournament.find(params[:id])
  end

  def debug_entry
    npc_player = Player.create_npc_player

    command = Tournament::EntryCommand.run(
      tournament_id: params[:id].to_i,
      current_player: npc_player,
    )

    redirect_to admin_tournaments_path
  end
end
