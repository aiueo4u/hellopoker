require 'rails_helper'

describe Poker::Deck do
  let(:deck) { Poker::Deck.new }

  describe '#draw' do
    context 'present cards in deck' do
      it do
        expect(deck.draw).to be_present
      end
    end

    context 'no cards in deck' do
      before do
        52.times { deck.draw }
      end

      it do
        expect { deck.draw }.to raise_error(StandardError)
      end
    end
  end

  describe '#draw_by_card_id' do
    context 'drawing card is in deck' do
      it do
        expect(deck.draw_by_card_id('As').id).to eq 'As'
      end
    end

    context 'drawing card is not in deck' do
      before do
        deck.draw_by_card_id('As')
      end

      it do
        expect { deck.draw_by_card_id('As') }.to raise_error(StandardError)
      end
    end
  end
end
