require 'rails_helper'

describe GameHand, type: :model do
  describe '#next_state' do
    context 'init -> preflop' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :init) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:preflop]
      end
    end

    context 'preflop -> flop' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :preflop) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:flop]
      end
    end

    context 'flop -> turn' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :flop) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:turn]
      end
    end

    context 'turn -> river' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :turn) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:river]
      end
    end

    context 'river -> result' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :river) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:result]
      end
    end

    context 'result -> finished' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :result) }
      it do
        expect(game_hand.next_state).to eq GameHand.states[:finished]
      end
    end

    context 'finished -> nil' do
      let(:game_hand) { FactoryGirl.create(:game_hand, :finished) }
      it do
        expect(game_hand.next_state).to be_nil
      end
    end
  end
end
