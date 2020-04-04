class Api::TestsController < Api::ApplicationController
  def create
    head :no_content
    ActionCable.server.broadcast 'test_channel', test_params
  end

  private

  def test_params
    params.permit(:type, :from, :to, :sdp, :candidate)
  end
end
