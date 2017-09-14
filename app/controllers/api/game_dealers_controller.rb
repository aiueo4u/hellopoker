class Api::GameDealersController < Api::ApplicationController
  before_action :check_jwt

  # ゲームスタート
  def start
    table_id = params[:table_id].to_i
    manager = GameManager.create_new_game(table_id, current_player)
    manager.broadcast

    render json: {}
  end

  # 着席＆バイイン
  def take_seat
    table_id = params[:table_id].to_i
    player_id = params[:player_id].to_i
    seat_no = params[:seat_no].to_i
    buy_in_amount = params[:buy_in_amount].to_i

    GameManager.take_seat(table_id, player_id, seat_no, buy_in_amount)

    manager = GameManager.new(table_id, player_id, nil, nil, current_player.id)
    manager.broadcast_game_state

    render json: {}
  end

  # ゲームアクションの処理
  def create
    table_id = params[:table_id].to_i
    player_id = params[:player_id].to_i
    type = params[:type]
    amount = params[:amount].to_i

    manager = GameManager.new(table_id, player_id, type, amount, current_player.id)
    manager.do_action

    # ゲーム開始直後にUNDOされた場合
    if manager.game_hand.destroyed?
      manager = GameManager.new(table_id, nil, nil, nil, nil)
    end

    manager.broadcast

    render json: {}
  end
end
