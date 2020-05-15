class GameAction::CreateCallCommand
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
      # コール額の計算
      amount_to_call = calculate_amount_to_call

      # コール額をスタックから引く
      current_game_hand_player.add_stack!(-1 * amount_to_call)

      # コールアクションを記録
      game_hand.build_call_action(current_player_id, amount_to_call, last_action_state)

      game_hand.save!
    end
  end

  private

  def calculate_amount_to_call
    game_hand.amount_to_call_by_player_id(table_player.player_id)
  end

  def current_game_hand_player
    game_hand.game_hand_player_by_id(table_player.player_id)
  end

  def validate_game_hand
    # 自分のターンか
    errors.add(:game_hand, :invalid) if table_player.seat_no != game_hand.current_seat_no
    # 必要コール額を持っているか
    errors.add(:game_hand, :invalid) if table_player.stack < calculate_amount_to_call
    # TODO: flop〜riverか
  end
end
