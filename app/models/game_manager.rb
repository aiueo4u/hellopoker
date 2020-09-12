class GameManager
  attr_reader :table_id, :table, :game_hand, :just_actioned, :just_created

  # 最新のゲームを取得
  def self.current_game_hand(table_id)
    GameHand.where(table_id: table_id).order(:id).last
  end

  def self.broadcast_all(table_id)
    new(table_id).broadcast_all
  end

  def initialize(table_id, options = {})
    @table_id = table_id
    @table = Table.find(table_id)
    @game_hand = GameHand.where(table_id: table_id).order(:id).last
    @just_created = options[:just_created] || false
  end

  def broadcast_all
    Broadcaster.new(self).broadcast_all
  end

  def just_actioned!
    @just_actioned = true
  end

  def next_action_player_id?(target_player_id)
    game_hand.current_seat_table_player.player_id == target_player_id
  end

  def do_payment
    while do_payment?
      game_hand.create_taken_actions
    end
  end

  def do_payment?
    current_state == 'payment'
  end

  def current_state
    game_hand ? game_hand.current_state : 'init'
  end

  def last_aggressive_seat_no
    return nil if game_hand.nil?
    return nil if game_hand.last_action_finished_round?

    last_aggressive_player_id = game_hand.game_actions.select do |action|
      action.state == current_state && (action.bet? || action.blind?)
    end.last&.player_id
    game_hand.table_player_by_player_id(last_aggressive_player_id)&.seat_no
  end
end
