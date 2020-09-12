class GameAction::CreateFoldCommand
  include Command

  attr_reader :game_hand, :table_player, :current_player_id, :last_action_state

  validate :validate_game_hand

  def initialize(game_hand:, table_player:, last_action_state:)
    @game_hand = game_hand
    @table_player = table_player
    @current_player_id = table_player.player_id
    @last_action_state = last_action_state
  end

  def run
    game_hand.with_lock do
      raise ActiveRecord::Rollback if invalid?
      # フォールドアクションを記録
      game_hand.build_fold_action(current_player_id, last_action_state)
      game_hand.save!
    end
  end

  private

  def validate_game_hand
    # 適切なラウンドか
    errors.add(:game_hand, :invalid) if !game_hand.current_state.in?(%w(preflop flop turn river))

    # 自分のターンか
    errors.add(:game_hand, :invalid) if table_player.seat_no != game_hand.current_seat_no
  end
end
