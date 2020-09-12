class GameHandPayment
  attr_reader :cards_by_player_id, :board_cards

  def self.calc_winning_player_ids(board_cards, cards_by_player_id)
    new(board_cards, cards_by_player_id).calc_winning_player_ids
  end

  def initialize(board_cards, cards_by_player_id)
    @board_cards = board_cards
    @cards_by_player_id = cards_by_player_id 
  end

  def calc_winning_player_ids
    # 各プレイヤーのハンドの強さを評価
    result = {}

    cards_by_player_id.each do |player_id, cards|
      hand = Poker::HandEvaluator.new(cards + board_cards)
      hand.evaluate # ハンドを評価
      result[player_id] = { hand: hand }
    end

    best_player_ids = Set.new([cards_by_player_id.keys.first])

    # ハンドの強さに基づいて順位付け
    cards_by_player_id.each do |player_id, cards|
      target_hand = result[player_id][:hand]
      best_hand = result[best_player_ids.first][:hand]

      if target_hand.compare_with(best_hand) == 1 # win
        best_player_ids = Set.new([player_id])
      elsif target_hand.compare_with(best_hand) == 0 # tie
        best_player_ids << player_id
      end
    end

    best_player_ids.to_a
  end
end
