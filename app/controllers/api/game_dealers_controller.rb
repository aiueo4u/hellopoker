class Api::GameDealersController < Api::ApplicationController
  before_action :check_jwt

  # ゲームスタート
  def start
    command = CreateGameHandCommand.run(
      table_id: params[:table_id].to_i,
      current_player_id: current_player.id,
    )
    head command.success? ? :created : :bad_request
  end

  # 着席＆バイイン
  def take_seat
    command = CreateTablePlayerCommand.run(
      table_id: params[:table_id].to_i,
      current_player_id: current_player.id,
      seat_no: params[:seat_no].to_i,
      amount: params[:buy_in_amount].to_i,
    )
    head command.success? ? :created : :bad_request
  end

  # NPCプレイヤーの着席＆バイイン
  def add_npc_player
    command = AddNpcPlayerCommand.run(
      table_id: params[:table_id].to_i,
      current_player_id: current_player.id,
      seat_no: params[:seat_no].to_i,
    )
    head command.success? ? :created : :bad_request
  end

  # ゲームアクションの処理
  def create
    command = CreateGameActionCommand.run(
      table_id: params[:table_id].to_i,
      current_player_id: params[:player_id].to_i,
      type: params[:type],
      amount: params[:amount].to_i,
    )
    head command.success? ? :created : :bad_request
  end
end
