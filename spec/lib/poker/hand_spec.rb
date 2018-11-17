require 'rails_helper'

describe Poker::Hand do
  let(:card_ids) { ['As', '3h', '8s', '8d', 'Kc'] }
  let(:cards) { card_ids.map { |id| Poker::Card.new(id) } }

  describe '.detect_hands_one_pair' do
    subject { Poker::Hand.detect_hands_one_pair(cards) }

    context 'when high card hand' do
      let(:card_ids) { %w(As 3h 8s Td Jd) }
      it { is_expected.to be_falsey }
    end

    context 'when one pair hand' do
      let(:card_ids) { %w(As 3h 8s 8d Kc) }
      it { is_expected.to be_truthy }
    end

    context 'when two pair hand' do
      let(:card_ids) { %w(As Ad 3h 3d 8c) }
      it { is_expected.to be_falsey }
    end
  end

  describe '.detect_hands_two_pair' do
    subject { Poker::Hand.detect_hands_two_pair(cards) }

    context 'when high card hand' do
      let(:card_ids) { %w(As 3h 8s Td Jd) }
      it { is_expected.to be_falsey }
    end

    context 'when one pair hand' do
      let(:card_ids) { %w(As 3h 8s 8d Kc) }
      it { is_expected.to be_falsey }
    end

    context 'when two pair hand' do
      let(:card_ids) { %w(As Ad 3h 3d 8c) }
      it { is_expected.to be_truthy }
    end

    context 'when three pair hand' do
      let(:card_ids) { %w(As Ad 3s 3d 8s 8d) }
      it do
        is_expected.to be_truthy
        expect(subject.map(&:rank).uniq).to eq %w(A 8)
      end
    end

    context 'when full house hand' do
      let(:card_ids) { %w(As Ad Ac 3h 3d) }
      it { is_expected.to be_falsey }
    end
  end

  describe '.detect_hands_three_of_a_kind' do
    subject { Poker::Hand.detect_hands_three_of_a_kind(cards) }

    context 'when high card hand' do
      let(:card_ids) { %w(As 3h 8s Td Jd) }
      it { is_expected.to be_falsey }
    end

    context 'when one pair hand' do
      let(:card_ids) { %w(As 3h 8s 8d Kc) }
      it { is_expected.to be_falsey }
    end

    context 'when two pair hand' do
      let(:card_ids) { %w(As Ad 3h 3d 8c) }
      it { is_expected.to be_falsey }
    end

    context 'when three of a kind' do
      let(:card_ids) { %w(As Ad Ad 3h 8c) }
      it { is_expected.to be_truthy }
    end

    context 'when full house hand' do
      let(:card_ids) { %w(As Ad Ac 3h 3d) }
      it { is_expected.to be_falsey }
    end

    context 'when 2 three of a kind' do
      let(:card_ids) { %w(As Ad Ad 3h 3c 3d) }
      it { is_expected.to be_falsey }
    end
  end

  describe '.detect_hands_straight' do
    subject { Poker::Hand.detect_hands_straight(cards) }

    context 'when one pair hand' do
      let(:card_ids) { %w(As 3h 8s 8d Kc) }
      it { is_expected.to be_falsey }
    end

    context 'when straight hand(9 high)' do
      let(:card_ids) { %w(5h 6d 7c 9h 8c 5d 6h) }
      it { is_expected.to be_truthy }
    end

    context 'when straight hand(K high)' do
      let(:card_ids) { %w(Kc Qc Jh 9h Td 5s 8s) }
      it { is_expected.to be_truthy }
    end

    context 'when straight hand(5 high)' do
      let(:card_ids) { %w(5h 4d 2c Ah 3c) }
      it { is_expected.to be_truthy }
    end

    context 'when high card hand' do
      let(:card_ids) { %w(Ks As 2h 3h 4c) }
      it 'K to 4 successive cards is not straight' do
        is_expected.to be_falsey
      end
    end
  end

  describe '.detect_hands_flush' do
    subject { Poker::Hand.detect_hands_flush(cards) }

    context 'when no flush hand' do
      let(:card_ids) { %w(Th 4s 5d 7c Ac 6h 3h) }
      it { is_expected.to be_falsey }
    end

    context 'when flush hand' do
      let(:card_ids) { %w(Th 4h 5h 7c Ac 6h 9h) }
      it { is_expected.to be_truthy }
    end
  end

  describe '.detect_hands_full_house' do
    subject { Poker::Hand.detect_hands_full_house(cards) }

    context 'when full house' do
      context 'with one 3 cards, one pair' do
        let(:card_ids) { %w(3h 3d 8h 8d 8c Ah Kc) }
        it { is_expected.to be_truthy }
      end

      context 'with two 3 cards' do
        let(:card_ids) { %w(3h 3d 3c 8d 8c 8h Kc) }
        it { is_expected.to be_truthy }
      end

      context 'with one 3 cards, two pairs' do
        let(:card_ids) { %w(3h 3d 8h 8d 8c Ah Ac) }
        it { is_expected.to be_truthy }
      end
    end

    context 'when no full house' do
      let(:card_ids) { %w(Th 4s 5d 7c Ac 6h 3h) }
      it { is_expected.to be_falsey }
    end
  end

  describe '.detect_hands_four_of_a_kind' do
    subject { Poker::Hand.detect_hands_four_of_a_kind(cards) }

    context 'when four of a kind' do
      let(:card_ids) { %w(3h 3d 3c 3s 8c Ah Kc) }
      it { is_expected.to be_truthy }
    end
  end

  describe '.detect_hands_straight_flush' do
    subject { Poker::Hand.detect_hands_straight_flush(cards) }

    context 'when straight flush hand' do
      let(:card_ids) { %w(5c 6c 7c 8c 9c Kc Ac) }
      it { is_expected.to be_truthy }
    end

    context 'when royal straight flush hand' do
      let(:card_ids) { %w(Th Jh Qh Kh Ah 2h 3h) }
      it { is_expected.to be_truthy }
    end

    context 'when straight and flush' do
      let(:card_ids) { %w(4c 5c 6c 7h 8h 9h Kh Ah) }
      it { is_expected.to be_falsey }
    end
  end
end
