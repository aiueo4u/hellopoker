require 'rails_helper'

describe GameHand::CurrentState, type: :model do
  describe '.calc_current_state' do
    subject { described_class.calc_current_state(game_hand: game_hand) }

    let(:command_runner) { CommandRunner.new(table) }

    def calc_current_state
      described_class.calc_current_state(game_hand: game_hand.reload)
    end

    context 'preflop' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }

      let(:table) { create(:table, table_players: table_players) }
      let(:table_players) { [table_player1, table_player2, table_player3] }
      let(:table_player1) { create(:table_player, seat_no: 1) }
      let(:table_player2) { create(:table_player, seat_no: 2) }
      let(:table_player3) { create(:table_player, seat_no: 3) }

      let(:game_hand_players) { [game_hand_player1, game_hand_player2, game_hand_player3] }
      let(:game_hand_player1) { create(:game_hand_player, game_hand: game_hand, player: table_player1.player, card1_id: 'As', card2_id: 'Ks') }
      let(:game_hand_player2) { create(:game_hand_player, game_hand: game_hand, player: table_player2.player, card1_id: 'Qd', card2_id: 'Qc') }
      let(:game_hand_player3) { create(:game_hand_player, game_hand: game_hand, player: table_player3.player, card1_id: 'Th', card2_id: 'Ts') }

      before do
        game_hand
        game_hand_players

        # blinds
        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 50, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :blind, amount: 100, player: table_player2.player)
      end

      it do
        expect(calc_current_state).to eq 'preflop'

        # BTN raise
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_BET_CHIPS', 200)

        expect(calc_current_state).to eq 'preflop'

        # SB call
        command_runner.run(table_player1.player_id, 'PLAYER_ACTION_CALL')

        expect(calc_current_state).to eq 'preflop'

        # BB call
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_CALL')

        expect(calc_current_state).to eq 'flop'

        # SB check
        command_runner.run(table_player1.player_id, 'PLAYER_ACTION_CHECK')

        expect(calc_current_state).to eq 'flop'

        # BB check
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_CHECK')

        expect(calc_current_state).to eq 'flop'

        # BTN bet
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_BET_CHIPS', 200)

        expect(calc_current_state).to eq 'flop'

        # SB fold
        command_runner.run(table_player1.player_id, 'PLAYER_ACTION_FOLD')

        expect(calc_current_state).to eq 'flop'

        # BB call
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_CALL')

        expect(calc_current_state).to eq 'turn'

        # BB check
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_CHECK')

        expect(calc_current_state).to eq 'turn'

        # BTN bet
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_BET_CHIPS', 200)

        expect(calc_current_state).to eq 'turn'

        # BB raise
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_BET_CHIPS', 400)

        expect(calc_current_state).to eq 'turn'

        # BTN call
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_CALL')

        expect(calc_current_state).to eq 'river'

        # BB check
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_CHECK')

        expect(calc_current_state).to eq 'river'

        # BTN check
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_CHECK')

        expect(calc_current_state).to eq 'hand_open'

        # BB show hand
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_SHOW_HAND')

        expect(calc_current_state).to eq 'hand_open'

        # BTN show hand
        command_runner.run(table_player3.player_id, 'PLAYER_ACTION_SHOW_HAND')

        # paymentラウンドはスキップされる(Command内でポット処理完了しちゃってる）

        expect(calc_current_state).to eq 'finished'
      end
    end

    context '# 1人以外全員fold or muck状態' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }

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

        # blinds
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player1.player)
        create(:game_action, game_hand: game_hand, action_type: :fold, player: table_player2.player)
      end

      it { expect(subject).to eq 'finished' }
    end

    context '# 全員アクションを終えている場合' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }

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

      it { expect(subject).to eq 'finished' }
    end

    context '# 自分以外の全員がアクションを終えており、必要なチップを出している場合' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }

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

      it { expect(subject).to eq 'payment' }
    end

    context '# hand_openラウンドだが、オールインしているプレイヤーがいる場合（hand_openラウンドをスキップ）' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }

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

      it { expect(subject).to eq 'payment' }
    end

    context 'false' do
      let(:game_hand) { create(:game_hand, table: table, button_seat_no: 3) }
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

      it { expect(subject).to eq 'preflop' }
    end
  end
end
