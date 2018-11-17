class Api::GameDealersController < Api::ApplicationController
  before_action :check_jwt

  # ゲームスタート
  def start
    table_id = params[:table_id].to_i

    manager = nil
    GameHand.transaction do
      Table.lock.find(table_id)

      # TODO: 雑に重複スターをチェック
      last_game_hand = GameHand.where(table_id: table_id).order(id: :desc).first
      if last_game_hand && !last_game_hand.game_actions.any?(&:result?)
        return render json: {}
      end

      # 全開のゲームが終了状態になっているかチェック
      manager = GameManager.create_new_game(table_id, current_player)
    end
    manager.broadcast

    render json: {}
  end

  # 着席＆バイイン
  def take_seat
    table_id = params[:table_id].to_i
    player_id = params[:player_id].to_i
    seat_no = params[:seat_no].to_i
    buy_in_amount = params[:buy_in_amount].to_i

    # TODO
    if player_id == 0
      player_id = current_player.id
    end

    GameHand.transaction do
      GameManager.take_seat(table_id, player_id, seat_no, buy_in_amount)
    end

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

    manager = nil
    Table.transaction do
      Table.lock.find(table_id)
      GameHand.transaction do
        manager = GameManager.new(table_id, player_id, type, amount, current_player.id)
        if manager.next_action_player_id?(player_id)
          manager.do_action
        end
      end
    end

    # ゲーム開始直後にUNDOされた場合
    if manager.game_hand.destroyed?
      manager = GameManager.new(table_id, nil, nil, nil, nil)
    end

    manager.broadcast

    render json: {}
  end
end
