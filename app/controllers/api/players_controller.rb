class Api::PlayersController < Api::ApplicationController
  before_action :check_jwt

  def show
    @player = current_player
  end

  def update
    current_player.with_lock do
      current_player.attributes = edit_params
      current_player.save!
    end

    @player = current_player
  end

  private

  def edit_params
    params.require(:player).permit(:profile_image)
  end
end
