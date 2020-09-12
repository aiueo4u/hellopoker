require 'rails_helper'

#RSpec.describe Api::GameDealersController, type: :controller do
# describe '.calc_next_seat_no' do
#   let(:player_1) { FactoryBot.create(:player) }
#   let(:player_2) { FactoryBot.create(:player) }
#   let(:player_3) { FactoryBot.create(:player) }
#   let(:player_4) { FactoryBot.create(:player) }
#   let(:table_player_1) { FactoryBot.create(:table_player, player_id: player_1.id, seat_no: 1) }
#   let(:table_player_2) { FactoryBot.create(:table_player, player_id: player_2.id, seat_no: 2) }
#   let(:table_player_3) { FactoryBot.create(:table_player, player_id: player_3.id, seat_no: 3) }
#   let(:table_player_4) { FactoryBot.create(:table_player, player_id: player_4.id, seat_no: 4) }
#
#   context 'プリフロップ、未アクション、UTGアクション' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :preflop, button_seat_no: 1, current_seat_no: 4, bb_used_option: false) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it do
#       is_expected.to eq 1
#     end
#   end
#
#   context 'プリフロップ、SBコンプリート' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :preflop, button_seat_no: 1, current_seat_no: 2, bb_used_option: false) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it 'オプション使用済みフラグが立ち、BBの出番' do
#       expect { subject }.to change { GameHand.find(game_hand.id).bb_used_option }.from(false).to(true)
#       is_expected.to eq 3
#     end
#   end
#
#   context 'プリフロップ、BBオプション' do
#     let(:game_hand) { FactoryBot.create(:game_hand, :preflop, button_seat_no: 1, current_seat_no: 3, bb_used_option: true) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it do
#       is_expected.to eq nil
#     end
#   end
# end
#
# describe '._calc_next_seat_no' do
#   let(:player_1) { FactoryBot.create(:player) }
#   let(:player_2) { FactoryBot.create(:player) }
#   let(:player_3) { FactoryBot.create(:player) }
#   let(:player_4) { FactoryBot.create(:player) }
#   let(:table_player_1) { FactoryBot.create(:table_player, player_id: player_1.id, seat_no: 1) }
#   let(:table_player_2) { FactoryBot.create(:table_player, player_id: player_2.id, seat_no: 2) }
#   let(:table_player_3) { FactoryBot.create(:table_player, player_id: player_3.id, seat_no: 3) }
#   let(:table_player_4) { FactoryBot.create(:table_player, player_id: player_4.id, seat_no: 4) }
#
#   context '1番ボタン、2番アクション' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 2) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '3番の出番' do
#       is_expected.to eq [3, false]
#     end
#   end
#
#   context '1番ボタン、3番アクション' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 3) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '4番の出番' do
#       is_expected.to eq [4, false]
#     end
#   end
#
#   context '1番ボタン、4番アクション' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 4) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '1番ボタンの出番になり、ボタン通過フラグが立つ' do
#       is_expected.to eq [1, true]
#     end
#   end
#
#   context '1番ボタン、2番フォールド' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 2) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :folded, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '3番の出番' do
#       is_expected.to eq [3, false]
#     end
#   end
#
#   context '3番がフォールド状態で1番ボタン、2番フォールド' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 2) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :folded, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :folded, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '4番の出番' do
#       is_expected.to eq [4, false]
#     end
#   end
#
#   context '2, 3番がフォールド状態で1番ボタン、4番フォールド' do
#     let(:game_hand) { FactoryBot.create(:game_hand, button_seat_no: 1, current_seat_no: 4) }
#     let(:table_players) { [table_player_1, table_player_2, table_player_3, table_player_4] }
#     subject { controller.send(:_calc_next_seat_no, game_hand, table_players) }
#
#     before do
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_1.id)
#       FactoryBot.create(:game_hand_player, :folded, game_hand_id: game_hand.id, player_id: player_2.id)
#       FactoryBot.create(:game_hand_player, :folded, game_hand_id: game_hand.id, player_id: player_3.id)
#       FactoryBot.create(:game_hand_player, :active, game_hand_id: game_hand.id, player_id: player_4.id)
#     end
#
#     it '1番ボタンの出番' do
#       is_expected.to eq [1, true]
#     end
#   end
# end
#end
