require 'rails_helper'

describe GameAction, type: :model do
  describe '.build_bet_action' do
    subject { described_class.build_bet_action(player, state, order_id, amount) }

    let(:game_hand) { create(:game_hand) }
    let(:player) { create(:player) }
    let(:order_id) { 1 }
    let(:amount) { 100 }
    let(:state) { 'preflop' }

    it do
      expect(subject.attributes).to eq({
        'id' => nil,
        'player_id' => player.id,
        'state' => 'preflop',
        'order_id' => 1,
        'action_type' => 'bet',
        'amount' => 100,
        'game_hand_id' => nil,
        'created_at' => nil,
        'updated_at' => nil,
      })
    end
  end
end
