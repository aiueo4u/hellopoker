class Api::PlayersController < Api::ApplicationController
  before_action :check_jwt

  def show
    @player = current_player
  end

  def update
    use_case = Player::UploadProfileImageUseCase.perform(
      player: current_player,
      profile_image: params[:player][:profile_image],
    )

    if use_case.success?
      @player = use_case.player
    else
      head :bad_request
    end
  end
end
