class CreateGameActionCommand
  include Command

  attr_reader :table, :current_player, :type, :amount, :manager

  validate :validate_table

  def initialize(table_id:, current_player_id:, type:, amount: nil)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
    @type = type
    @amount = amount
  end

  def run
    table.with_lock do
      @manager = GameManager.new(table.id)
      raise ActiveRecord::Rollback if invalid?

      # アクション実行
      do_action

      # ゲーム終了処理の実行
      if hand_finished?
        do_payment
      end
    end

    if success?
      # 結果を各プレイヤーに配信
      broadcast_result

      # 次のプレイヤーのターン開始
      if @manager.current_state != 'finished'
        start_next_player_turn
      end
    end
  end

  private

  def current_table_player
    game_hand.table_player_by_player_id(current_player.id)
  end

  # タイムアウト時のアクションの強制
  def adjust_action_type(type)
    if game_hand.checkable_by?(current_table_player)
      'PLAYER_ACTION_CHECK'
    elsif type == 'PLAYER_ACTION_SHOW_HAND'
      'PLAYER_ACTION_MUCK_HAND'
    else
      'PLAYER_ACTION_FOLD'
    end
  end

  def game_hand
    manager.game_hand
  end

  def action_timeout?
    game_hand.next_action_timeout?
  end

  def hand_finished?
    manager.hand_finished?
  end

  def do_action
    # アクション前の状態を保持
    last_action_state = @manager.current_state

    # タイムアウトの場合の強制アクション
    if action_timeout?
      @type = adjust_action_type(type)
    end

    case type
    when 'PLAYER_ACTION_SHOW_HAND'
      command = GameAction::CreateShowCommand.run(game_hand: game_hand, table_player: current_table_player, last_action_state: last_action_state)
    when 'PLAYER_ACTION_MUCK_HAND'
      command = GameAction::CreateMuckCommand.run(game_hand: game_hand, table_player: current_table_player, last_action_state: last_action_state)
    when 'PLAYER_ACTION_CHECK'
      command = GameAction::CreateCheckCommand.run(game_hand: game_hand, table_player: current_table_player, last_action_state: last_action_state)
    when 'PLAYER_ACTION_BET_CHIPS' # Raiseも含んでいる
      command = GameAction::CreateBetCommand.run(game_hand: game_hand, table_player: current_table_player, amount: amount, last_action_state: last_action_state)
    when 'PLAYER_ACTION_CALL'
      command = GameAction::CreateCallCommand.run(game_hand: game_hand, table_player: current_table_player, last_action_state: last_action_state)
    when 'PLAYER_ACTION_FOLD'
      command = GameAction::CreateFoldCommand.run(game_hand: game_hand, table_player: current_table_player, last_action_state: last_action_state)
    else
      raise "Unknown type: `#{type}`"
    end

    if command.success?
      manager.just_actioned!
    else
      errors.add(:table, :invalid)
      raise ActiveRecord::Rollback
    end
  end

  # 精算処理の実行
  def do_payment
    while manager.current_state == 'result' # TODO: 無限ループ防止策入れようかな。。
      game_hand.create_taken_actions(
        manager.calc_winning_player_ids,
        manager.current_state,
      )
    end
  end

  def broadcast_result
    manager.broadcast
  end

  def start_next_player_turn
    table_player = game_hand.table_player_by_seat_no(game_hand.current_seat_no)
    if table_player.auto_play?
      NpcPlayerJob.perform_later(table.id, table_player.player_id)
    end
    TimeKeeperJob.perform_later(table.id, table_player.player_id, game_hand.last_action.order_id)
  end

  def validate_table
    errors.add(:table, :invalid) if !manager.next_action_player_id?(current_player.id)
  end
end
