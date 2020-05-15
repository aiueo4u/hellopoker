class GameAction::CreateShowCommand
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
      # ハンドショウアクションを記録
      game_hand.build_show_action(current_player_id, last_action_state)
      game_hand.save!
    end
  end

  private

  def validate_game_hand
    # 自分のターンか
    errors.add(:game_hand, :invalid) if table_player.seat_no != game_hand.current_seat_no
    # TODO: ショウダウンフェーズか
  end
end
