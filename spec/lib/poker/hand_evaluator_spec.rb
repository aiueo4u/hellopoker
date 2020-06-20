require 'rails_helper'

describe Poker::HandEvaluator do
  describe '#compare_with' do
    let(:board_card_ids) { [] }
    let(:board_cards) { board_card_ids.map { |id| Poker::Card.new(id) } }
    let(:hero_hole_card_ids) { [] }
    let(:hero_hole_cards) { hero_hole_card_ids.map { |id| Poker::Card.new(id) } }
    let(:villain_hole_card_ids) { [] }
    let(:villain_hole_cards) { villain_hole_card_ids.map { |id| Poker::Card.new(id) } }
    let(:hero_cards) { hero_hole_cards + board_cards }
    let(:villain_cards) { villain_hole_cards + board_cards }
    let(:hero_hand_evaluator) { Poker::HandEvaluator.new(hero_cards) }
    let(:villain_hand_evaluator) { Poker::HandEvaluator.new(villain_cards) }

    context 'hero wins' do
      context 'by better hands' do
        let(:hero_hole_card_ids) { %w(Ah Ac) }
        let(:villain_hole_card_ids) { %w(7d 7c) }
        let(:board_card_ids) { %w(Ad Kc 8h 5d 2h) }

        it do
          expect(hero_hand_evaluator.compare_with(villain_hand_evaluator)).to eq 1
        end
      end

      context 'by better kicker' do
        let(:hero_hole_card_ids) { %w(Ah Jh) }
        let(:villain_hole_card_ids) { %w(Ac 7c) }
        let(:board_card_ids) { %w(Ad Kc 8h 5d 2h) }

        it do
          expect(hero_hand_evaluator.compare_with(villain_hand_evaluator)).to eq 1
        end
      end
    end

    context 'hero loses' do
      context 'by worse hands' do
        let(:hero_hole_card_ids) { %w(7d 7c) }
        let(:villain_hole_card_ids) { %w(Ah Ac) }
        let(:board_card_ids) { %w(Ad Kc 8h 5d 2h) }

        it do
          expect(hero_hand_evaluator.compare_with(villain_hand_evaluator)).to eq -1
        end
      end

      context 'by worse kicker' do
        let(:hero_hole_card_ids) { %w(Ac 7c) }
        let(:villain_hole_card_ids) { %w(Ah Jh) }
        let(:board_card_ids) { %w(Ad Kc 8h 5d 2h) }

        it do
          expect(hero_hand_evaluator.compare_with(villain_hand_evaluator)).to eq -1
        end
      end
    end

    context 'tie' do
      let(:hero_hole_card_ids) { %w(Kc Jc) }
      let(:villain_hole_card_ids) { %w(Kh Jh) }
      let(:board_card_ids) { %w(Ad Kc 8h 5d 2h) }

      it do
        expect(hero_hand_evaluator.compare_with(villain_hand_evaluator)).to eq 0
      end
    end
  end

  describe '#evaluate' do
    let(:board_card_ids) { [] }
    let(:hole_card_ids) { [] }
    let(:board_cards) { board_card_ids.map { |id| Poker::Card.new(id) } }
    let(:hole_cards) { hole_card_ids.map { |id| Poker::Card.new(id) } }
    let(:cards) { hole_cards + board_cards }
    let(:hand_evaluator) { Poker::HandEvaluator.new(cards) }

    context 'high card' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 7d) }
      let(:hole_card_ids) { %w(As 3h) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_HIGH_CARD
        expect(hand_evaluator.kickers).to eq [14, 11, 10, 8, 7, 5, 3]
      end
    end

    context 'one pair' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 7d) }
      let(:hole_card_ids) { %w(Ks Th) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_ONE_PAIR
        expect(hand_evaluator.kickers).to eq [10, 13, 11, 8, 7, 5]
      end
    end

    context 'two pair' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 7d) }
      let(:hole_card_ids) { %w(Js Th) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_TWO_PAIR
        expect(hand_evaluator.kickers).to eq [11, 10, 8]
      end
    end

    context 'three of a kind' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 7d) }
      let(:hole_card_ids) { %w(Ts Th) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_THREE_OF_A_KIND
        expect(hand_evaluator.kickers).to eq [10, 11, 8]
      end
    end

    context 'straight' do
      context 'of 5 high' do
        let(:board_card_ids) { %w(5h 8h Tc 2d 3d) }
        let(:hole_card_ids) { %w(As 4c) }

        it do
          hand_evaluator.evaluate
          expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_STRAIGHT
          expect(hand_evaluator.kickers).to eq [5]
        end
      end

      context 'of Q high' do
        let(:board_card_ids) { %w(5h 8h Tc Jd 7d) }
        let(:hole_card_ids) { %w(9s Qc) }

        it do
          hand_evaluator.evaluate
          expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_STRAIGHT
          expect(hand_evaluator.kickers).to eq [12]
        end
      end

      context 'of A high' do
        let(:board_card_ids) { %w(5h Ah Tc Jd Kd) }
        let(:hole_card_ids) { %w(9s Qc) }

        it do
          hand_evaluator.evaluate
          expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_STRAIGHT
          expect(hand_evaluator.kickers).to eq [14]
        end
      end
    end

    context 'flush' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 7h) }
      let(:hole_card_ids) { %w(Kh Qh) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_FLUSH
        expect(hand_evaluator.kickers).to eq [13, 12, 8, 7, 5]
      end
    end

    context 'full house' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 5d) }
      let(:hole_card_ids) { %w(8d 8c) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_FULL_HOUSE
        expect(hand_evaluator.kickers).to eq [8, 5]
      end
    end

    context 'full house: 55588' do
      let(:board_card_ids) { %w(5h 5s Tc Jd 5d) }
      let(:hole_card_ids) { %w(8d 8c) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_FULL_HOUSE
        expect(hand_evaluator.kickers).to eq [5, 8]
      end
    end

    context 'four of a kind' do
      let(:board_card_ids) { %w(5h 8h Tc Jd 8s) }
      let(:hole_card_ids) { %w(8d 8c) }

      it do
        hand_evaluator.evaluate
        expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_FOUR_OF_A_KIND
        expect(hand_evaluator.kickers).to eq [8, 11]
      end
    end

    context 'straight flush' do
      context '9 high' do
        let(:board_card_ids) { %w(4h 5h 8h 9h Kd) }
        let(:hole_card_ids) { %w(6h 7h) }

        it do
          hand_evaluator.evaluate
          expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_STRAIGHT_FLUSH
          expect(hand_evaluator.kickers).to eq [9]
        end
      end

      context '5 high' do
        let(:board_card_ids) { %w(4h 5h Ah 9h Kd) }
        let(:hole_card_ids) { %w(2h 3h) }

        it do
          hand_evaluator.evaluate
          expect(hand_evaluator.hands).to eq Poker::HandEvaluator::HANDS_STRAIGHT_FLUSH
          expect(hand_evaluator.kickers).to eq [5]
        end
      end
    end
  end
end
