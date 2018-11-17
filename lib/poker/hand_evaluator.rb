module Poker
  class HandEvaluator
    HANDS_HIGH_CARD = 1
    HANDS_ONE_PAIR = 2
    HANDS_TWO_PAIR = 3
    HANDS_THREE_OF_A_KIND = 4
    HANDS_STRAIGHT = 5
    HANDS_FLUSH = 6
    HANDS_FULL_HOUSE = 7
    HANDS_FOUR_OF_A_KIND = 8
    HANDS_STRAIGHT_FLUSH = 9

    def initialize(cards)
      # NOTE: 約判定はMAX7枚を前提に最適化されている
      raise 'invalid card num' unless cards.size.in?([5, 6, 7])
      raise 'invalid cards' unless cards.all? { |card| card.is_a?(Card) }
      @cards = cards
    end

    # -1: 負け
    # 0: 引き分け
    # 1: 勝ち
    def compare_with(target_hand)
      return 1 if self.hands > target_hand.hands # win
      return -1 if self.hands < target_hand.hands # lose

      # 同じ役なのでキッカー勝負
      self.kickers.each_with_index do |strength, i|
        return -1 if strength < target_hand.kickers[i]
        return 1 if strength > target_hand.kickers[i]
        # next kicker...
      end

      0 # 引き分け
    end

    def evaluate
      return @result if @result.present?

      @result = {}

      hands = nil
      kickers = []
      msg = @cards.sort_by(&:strength).reverse.map(&:id).join(" ") + ": "

      if cards_sf = Poker::Hand.detect_hands_straight_flush(@cards)
        hands = HANDS_STRAIGHT_FLUSH
        if [2,3,4,5,14] == cards_sf.map(&:strength).sort
          msg += "straignt flush, 5"
          kickers << 5
        else
          msg += "straignt flush, #{cards_sf.max_by(&:strength).rank}"
          kickers << cards_sf.map(&:strength).max
        end
      elsif cards_4 = Poker::Hand.detect_hands_four_of_a_kind(@cards)
        hands = HANDS_FOUR_OF_A_KIND
        msg += "four of a kind, #{cards_4.first.rank}"
        kickers << cards_4.first.strength
        kickers << (@cards - cards_4).map(&:strength).sort.last
      elsif cards_fh = Poker::Hand.detect_hands_full_house(@cards)
        hands = HANDS_FULL_HOUSE
        higher_card = cards_fh.max_by(&:strength)
        lower_card = cards_fh.min_by(&:strength)
        msg += "full house, #{higher_card.rank} #{lower_card.rank}"
        kickers << higher_card.strength
        kickers << lower_card.strength
      elsif cards_f = Poker::Hand.detect_hands_flush(@cards)
        hands = HANDS_FLUSH
        msg += "flush, '#{cards_f.first.suit}'"
        kickers = cards_f.map(&:strength).sort { |a,b| b <=> a }
      elsif cards_s = Poker::Hand.detect_hands_straight(@cards)
        hands = HANDS_STRAIGHT
        if [2,3,4,5,14] == cards_s.map(&:strength).sort
          msg += "straignt, 5"
          kickers << 5
        else
          msg += "straignt, #{cards_s.max_by(&:strength).rank}"
          kickers << cards_s.map(&:strength).max
        end
      elsif cards_3 = Poker::Hand.detect_hands_three_of_a_kind(@cards)
        hands = HANDS_THREE_OF_A_KIND
        msg += "three of a kind, #{cards_3.first.rank}"
        kickers << cards_3.first.strength
        kickers = kickers + (@cards - cards_3).map(&:strength).sort { |a,b| b <=> a }.slice(0, 2)
      elsif cards_2p = Poker::Hand.detect_hands_two_pair(@cards)
        hands = HANDS_TWO_PAIR
        msg += "two pair, #{cards_2p.max_by(&:strength).rank} #{cards_2p.min_by(&:strength).rank}"
        kickers = cards_2p.map(&:strength).sort { |a,b| b <=> a }.uniq
        kickers << (@cards - cards_2p).max_by(&:strength).strength
      elsif cards_p = Poker::Hand.detect_hands_one_pair(@cards)
        hands = HANDS_ONE_PAIR
        msg += "one pair, #{cards_p.first.rank}"
        kickers << cards_p.first.strength
        kickers = kickers + (@cards - cards_p).map(&:strength).sort { |a,b| b <=> a }
      else
        hands = HANDS_HIGH_CARD
        high_card = @cards.max_by(&:strength)
        msg += "high card, #{high_card.rank}"
        kickers = @cards.map(&:strength).sort { |a,b| b <=> a }
      end
      @result[:hands] = hands
      @result[:msg] = msg
      @result[:kickers] = kickers
      @result
    end

    def hands
      evaluate[:hands]
    end

    def kickers
      evaluate[:kickers]
    end

    def msg
      evaluate[:msg]
    end
  end
end
