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
      npc_type: NpcPlayer.profile_by_npc_type.keys.sample,
    )
    head command.success? ? :created : :bad_request
  end

  # ゲームアクションの処理
  def create
    command = CreateGameActionCommand.run(
      table_id: params[:table_id].to_i,
      current_player_id: current_player.id,
      type: params[:type],
      amount: params[:amount].to_i,
    )
    head command.success? ? :created : :bad_request
  end

  def retry_npc_player_action
    game_hand = GameManager.new(params[:table_id]).game_hand
    table_player = game_hand.current_seat_table_player
    if table_player.auto_play?
      NpcPlayerJob.perform_later(table_player.table_id, table_player.player_id)
    end
  end
end
