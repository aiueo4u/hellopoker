class CreateGameActionCommand
  include Command

  attr_reader :table, :current_player, :type, :amount, :manager

  validate :validate_table

  def initialize(table_id:, current_player_id:, type:, amount:)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
    @type = type
    @amount = amount
  end

  def run
    table.with_lock do
      @manager = GameManager.new(table.id, current_player.id, type, amount)
      raise ActiveRecord::Rollback if invalid?
      @manager.do_action
    end

    if success?
      # 結果を各プレイヤーに配信
      @manager.broadcast

      # 次のプレイヤーのターン開始
      if @manager.current_state != 'finished'
        table_player = @manager.game_hand.table_player_by_seat_no(@manager.game_hand.current_seat_no)
        if table_player.auto_play?
          NpcPlayerJob.perform_later(table.id, table_player.player_id)
        end
        TimeKeeperJob.perform_later(table.id, table_player.player_id, @manager.game_hand.last_action.order_id)
      end
    end
  end

  private

  def validate_table
    errors.add(:table, :invalid) if !manager.next_action_player_id?(current_player.id)
  end
end
