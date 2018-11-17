module Poker
  module Hand
    def self.detect_hands_one_pair(cards)
      grouped_cards_for_2 = cards.group_by(&:strength).select { |k, v| v.size == 2 }
      return nil unless grouped_cards_for_2.keys.size == 1
      grouped_cards_for_2.values.flatten
    end

    def self.detect_hands_two_pair(cards)
      grouped_cards_for_2 = cards.group_by(&:strength).select { |k, v| v.size == 2 }
      return nil unless grouped_cards_for_2.keys.size >= 2
      grouped_cards_for_2.values.flatten.sort_by { |card| -1 * card.strength }.slice(0, 4)
    end

    def self.detect_hands_three_of_a_kind(cards)
      grouped_cards = cards.group_by(&:strength)
      return nil if grouped_cards.any? { |strength, cards| !cards.size.in?([1, 3]) }
      grouped_cards_for_3 = grouped_cards.select { |strength, cards| cards.size == 3 }
      return nil if grouped_cards_for_3.keys.size != 1
      grouped_cards_for_3.values.flatten
    end

    def self.detect_hands_straight(cards)
      # ストレートが完成しているかどうかを見る
      prev_strength = nil
      successive_card_groups = []
      group_index = 0

      sorted_cards = cards.sort_by(&:strength)

      # Ato5対応
      if sorted_cards.last.rank == 'A'
        prev_strength = 1 # 本当は1とか無いが便宜上使う
        successive_card_groups[group_index] = [sorted_cards.last]
      end

      sorted_cards.each do |card|
        if !prev_strength
          successive_card_groups[group_index] = [card]
          prev_strength = card.strength
          next
        end

        next if card.strength == prev_strength

        if card.strength == prev_strength + 1
          successive_card_groups[group_index] << card
        else
          group_index += 1
          successive_card_groups[group_index] = [card]
        end
        prev_strength = card.strength
      end

      straight_cards =  successive_card_groups.select { |cards| cards.size >= 5 }.last
      return if !straight_cards
      straight_cards.reverse.slice(0, 5)
    end

    def self.detect_hands_flush(cards)
      cards_by_suit = cards.group_by(&:suit)
      _, flush_cards = cards_by_suit.select { |suit, cards| cards.size >= 5 }.first
      return if flush_cards.nil? || flush_cards.empty?
      flush_cards.sort_by { |card| -1 * card.strength }.slice(0, 5)
    end

    def self.detect_hands_full_house(cards)
      grouped_cards = cards.group_by(&:strength)
      grouped_cards_for_3 = grouped_cards.select { |k, v| v.size == 3 }
      return nil if grouped_cards_for_3.empty?
      strength_of_3, cards_of_3 = grouped_cards_for_3.sort_by { |strength, cards| strength }.last

      grouped_cards_for_2 = grouped_cards.select { |k, v| v.size >= 2 && strength_of_3 != k }
      return nil if grouped_cards_for_2.empty?
      strength_of_2, cards_of_2 = grouped_cards_for_2.sort_by { |strength, cards| strength }.last
      full_house_cards = cards_of_3 + cards_of_2
    end

    def self.detect_hands_four_of_a_kind(cards)
      grouped_cards = cards.group_by(&:strength).select { |k, v| v.size == 4 }
      return nil if grouped_cards.empty?
      four_cards = grouped_cards.max_by { |k,v| k }[1]
    end

    def self.detect_hands_straight_flush(cards)
      cards_by_suit = cards.group_by(&:suit)
      _, flush_cards = cards_by_suit.select { |suit, cards| cards.size >= 5 }.first
      return if flush_cards.nil? || flush_cards.empty?
      self.detect_hands_straight(flush_cards)
    end
  end
end
