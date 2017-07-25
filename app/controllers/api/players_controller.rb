class Api::PlayersController < Api::ApplicationController
  before_action :check_jwt

  def show
    @player = current_player
  end
end
