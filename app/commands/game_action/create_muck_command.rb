class GameAction::CreateMuckCommand
  include Command

  attr_reader :game_hand, :table_player, :current_player_id

  validate :validate_game_hand

  def initialize(game_hand:, table_player:)
    @game_hand = game_hand
    @table_player = table_player
    @current_player_id = table_player.player_id
  end

  def run
    game_hand.with_lock do
      raise ActiveRecord::Rollback if invalid?
      # ハンドマックアクションを記録
      game_hand.build_muck_action(current_player_id)
      game_hand.save!
    end
  end

  private

  def validate_game_hand
    # 適切なラウンドか
    errors.add(:game_hand, :invalid) if game_hand.current_state != 'hand_open'

    # 自分のターンか
    errors.add(:game_hand, :invalid) if table_player.seat_no != game_hand.current_seat_no
  end
end
