require 'rails_helper'

describe CreateGameHandCommand do
  describe '.run' do
    context '1ゲーム目' do
      let(:table_player1) { create(:table_player, seat_no: 1, stack: 10000) }
      let(:table_player2) { create(:table_player, seat_no: 2, stack: 10000) }
      let(:table_player3) { create(:table_player, seat_no: 3, stack: 10000) }
      let(:table_player4) { create(:table_player, seat_no: 4, stack: 10000) }
      let(:table_player5) { create(:table_player, seat_no: 5, stack: 10000) }
      let(:table_player6) { create(:table_player, seat_no: 6, stack: 10000) }
      let(:table_players) {
        [
          table_player1,
          table_player2,
          table_player3,
          table_player4,
          table_player5,
          table_player6,
        ]
      }
      let(:table) { create(:table, table_players: table_players) }

      subject { CreateGameHandCommand.run(table_id: table.id, current_player_id: table_player1.player_id).game_hand }

      it 'has button_seat_no' do
        expect(subject.button_seat_no).to eq table_player1.seat_no
      end

      it 'has SB action' do
        expect(subject.game_actions[0].player_id).to eq table_player2.player_id
        expect(subject.game_actions[0].action_type).to eq 'blind'
        expect(subject.game_actions[0].amount).to eq table.sb_size
        expect(table_player2.reload.stack).to eq 9950
      end

      it 'has BB action' do
        expect(subject.game_actions[1].player_id).to eq table_player3.player_id
        expect(subject.game_actions[1].action_type).to eq 'blind'
        expect(subject.game_actions[1].amount).to eq table.bb_size
        expect(table_player3.reload.stack).to eq 9900
      end
    end

    context '2ゲーム目' do
      let(:table_player1) { create(:table_player, seat_no: 1, stack: 10000) } # btn, -
      let(:table_player2) { create(:table_player, seat_no: 2, stack: 10000) } # sb, -
      let(:table_player3) { create(:table_player, seat_no: 3, stack: 10000) } # bb, sb
      let(:table_player4) { create(:table_player, seat_no: 4, stack: 10000) } # -, bb
      let(:table_player5) { create(:table_player, seat_no: 5, stack: 10000) }
      let(:table_player6) { create(:table_player, seat_no: 6, stack: 10000) }
      let(:table_players) {
        [
          table_player1,
          table_player2,
          table_player3,
          table_player4,
          table_player5,
          table_player6,
        ]
      }
      let(:table) { create(:table, table_players: table_players) }
      let(:command_runner) { CommandRunner.new(table) }

      subject { CreateGameHandCommand.run(table_id: table.id, current_player_id: table_player1.player_id).game_hand }

      before do
        # 1ゲーム目
        CreateGameHandCommand.run(table_id: table.id, current_player_id: table_player1.player_id)
        command_runner.run(table_player4.player_id, 'PLAYER_ACTION_FOLD')
        command_runner.run(table_player5.player_id, 'PLAYER_ACTION_FOLD')
        command_runner.run(table_player6.player_id, 'PLAYER_ACTION_FOLD')
        command_runner.run(table_player1.player_id, 'PLAYER_ACTION_FOLD')
        command_runner.run(table_player2.player_id, 'PLAYER_ACTION_FOLD')
      end

      it 'has button_seat_no' do
        expect(subject.button_seat_no).to eq table_player2.seat_no
      end

      it 'has SB action' do
        expect(subject.game_actions[0].player_id).to eq table_player3.player_id
        expect(subject.game_actions[0].action_type).to eq 'blind'
        expect(subject.game_actions[0].amount).to eq table.sb_size
        expect(table_player3.reload.stack).to eq 10000 # 1ゲーム目考慮
      end

      it 'has BB action' do
        expect(subject.game_actions[1].player_id).to eq table_player4.player_id
        expect(subject.game_actions[1].action_type).to eq 'blind'
        expect(subject.game_actions[1].amount).to eq table.bb_size
        expect(table_player4.reload.stack).to eq 9900 # bb
      end
    end
  end

  context '1ゲーム目: 最初のUTGアクション' do
    let(:table_player1) { create(:table_player, seat_no: 1, stack: 10000) }
    let(:table_player2) { create(:table_player, seat_no: 2, stack: 10000) }
    let(:table_player3) { create(:table_player, seat_no: 3, stack: 10000) }
    let(:table_player4) { create(:table_player, seat_no: 4, stack: 10000) }
    let(:table_player5) { create(:table_player, seat_no: 5, stack: 10000) }
    let(:table_player6) { create(:table_player, seat_no: 6, stack: 10000) }
    let(:utg_table_player) { table_player4 }
    let(:table_players) {
      [
        table_player1,
        table_player2,
        table_player3,
        table_player4,
        table_player5,
        table_player6,
      ]
    }
    let(:table) { create(:table, table_players: table_players) }
    let(:game_hand) { CreateGameHandCommand.run(table_id: table.id, current_player_id: table_player1.player_id).game_hand }

    describe '#current_max_bet_amount' do
      subject { game_hand.current_max_bet_amount }

      it 'is 100(1BB)' do
        expect(subject).to eq table.bb_size
      end
    end

    describe '#amount_to_call_by_player_id' do
      it 'is 100(1BB)' do
        expect(game_hand.amount_to_call_by_player_id(utg_table_player.player_id)).to eq table.bb_size
      end
    end
  end
end
