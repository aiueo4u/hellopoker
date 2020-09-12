class GameAction::CreateBetCommand
  include Command

  attr_reader :game_hand, :table_player, :amount, :current_player_id, :last_action_state

  validate :validate_game_hand

  def initialize(game_hand:, table_player:, amount:,last_action_state:)
    @game_hand = game_hand
    @table_player = table_player
    @amount = amount
    @current_player_id = table_player.player_id
    @last_action_state = last_action_state
  end

  def run
    game_hand.with_lock do
      raise ActiveRecord::Rollback if invalid?
      # ベット額をスタックから引く
      current_game_hand_player.add_stack!(-1 * amount)

      # ベットアクションを記録
      game_hand.build_bet_action(current_player_id, amount, last_action_state)

      game_hand.save!
    end
  end

  private

  def calculate_amount_to_call
    game_hand.amount_to_call_by_player_id(table_player.player_id)
  end

  def calculate_amount_to_min_bet
    game_hand.amount_to_min_bet_by_player_id(table_player.player_id)
  end

  def current_game_hand_player
    game_hand.game_hand_player_by_id(table_player.player_id)
  end

  def validate_game_hand
    # 適切なラウンドか
    errors.add(:game_hand, :invalid) if !game_hand.current_state.in?(%w(preflop flop turn river))

    # 自分のターンか
    errors.add(:game_hand, :invalid) if table_player.seat_no != game_hand.current_seat_no

    # 指定ベット額はコール額を超えているか（同じならコールになり、ベットできない）
    errors.add(:game_hand, :invalid) if calculate_amount_to_call >= amount

    # 指定ベット額を持っているか
    errors.add(:game_hand, :invalid) if table_player.stack < amount

    # オールインじゃない場合
    if table_player.stack != amount
      # 最低ベット額
      errors.add(:game_hand, :invalid) if amount < calculate_amount_to_min_bet
    end
  end
end
