require 'rails_helper'

describe GameHand, type: :model do
  describe '#no_more_action?' do
    subject { game_hand.no_more_action? }

    context '# 1人以外全員fold or muck状態' do
      let(:game_hand) { create(:game_hand, table: table) }

      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player) }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player) }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player) }

      before do
        game_hand
        game_hand_players

        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player2.player)
      end

      it { expect(subject).to eq true }
    end

    context '# 全員アクションを終えている場合' do
      let(:game_hand) { create(:game_hand, table: table) }

      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player) }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player) }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player) }

      before do
        game_hand
        game_hand_players

        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player2.player)
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player3.player)
      end

      it { expect(subject).to eq true }
    end

    context '# 自分以外の全員がアクションを終えており、必要なチップを出している場合' do
      let(:game_hand) { create(:game_hand, table: table) }

      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player) }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player, initial_stack: 100) }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player) }

      before do
        game_hand
        game_hand_players

        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 50, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 100, player: table_player2.player)
        create(:game_action, game_hand: game_hand, action_type: :bet, amount: 200, player: table_player3.player)
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player1.player)
      end

      it { expect(subject).to eq true }
    end

    context '# hand_openラウンドだが、オールインしているプレイヤーがいる場合（hand_openラウンドをスキップ）' do
      let(:game_hand) { create(:game_hand, table: table) }

      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player) }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player, initial_stack: 100) }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player) }

      before do
        game_hand
        game_hand_players

        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 50, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 100, player: table_player2.player)
        create(:game_action, game_hand: game_hand, action_type: :bet, amount: 200, player: table_player3.player)
        create(:game_action, game_hand: game_hand, action_type: :call, amount: 100, player: table_player1.player)

        # flop
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'flop', player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'flop', player: table_player3.player)

        # turn
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'turn', player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'turn', player: table_player3.player)

        # river
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'river', player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :check, state: 'river', player: table_player3.player)
      end

      it { expect(subject).to eq true }
    end

    context 'false' do
      let(:game_hand) { create(:game_hand, table: table) }
      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player) }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player) }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player) }

      before do
        game_hand
        game_hand_players

        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 50, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 100, player: table_player2.player)
      end

      it { expect(subject).to eq false }
    end
  end
end

#describe GameHand, type: :model do
# describe '#next_state' do
#   context 'init -> preflop' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :init) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:preflop]
#     end
#   end
#
#   context 'preflop -> flop' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :preflop) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:flop]
#     end
#   end
#
#   context 'flop -> turn' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :flop) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:turn]
#     end
#   end
#
#   context 'turn -> river' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :turn) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:river]
#     end
#   end
#
#   context 'river -> result' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :river) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:result]
#     end
#   end
#
#   context 'result -> finished' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :result) }
#     it do
#       expect(game_hand.next_state).to eq GameHand.states[:finished]
#     end
#   end
#
#   context 'finished -> nil' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :finished) }
#     it do
#       expect(game_hand.next_state).to be_nil
#     end
#   end
# end
#end
