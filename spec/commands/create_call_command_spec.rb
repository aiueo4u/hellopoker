require 'rails_helper'

describe GameAction::CreateCallCommand do
  describe '.run' do
    context 'preflop: 最初のUTGアクション' do
      let(:btn_table_player) { create(:table_player, seat_no: 1, stack: 10000) }
      let(:sb_table_player) { create(:table_player, seat_no: 2, stack: 10000) }
      let(:bb_table_player) { create(:table_player, seat_no: 3, stack: 10000) }
      let(:utg_table_player) { create(:table_player, seat_no: 4, stack: 10000) }
      let(:hj_table_player) { create(:table_player, seat_no: 5, stack: 10000) }
      let(:co_table_player) { create(:table_player, seat_no: 6, stack: 10000) }
      let(:table_players) {
        [
          btn_table_player,
          sb_table_player,
          bb_table_player,
          utg_table_player,
          hj_table_player,
          co_table_player,
        ]
      }
      let(:table) { create(:table, table_players: table_players) }
      let(:game_hand) { CreateGameHandCommand.run(table_id: table.id, current_player_id: btn_table_player.player_id).game_hand }
      let(:last_action_state) { 'preflop' }
      let(:action_table_player) { utg_table_player }

      subject {
        GameAction::CreateCallCommand.run(
          game_hand: game_hand,
          table_player: action_table_player,
          last_action_state: last_action_state
        )
      }

      it 'can call' do
        expect(subject.success?).to be_truthy
      end

      it 'reduce player\'s stack' do
        expect(subject.game_hand.game_hand_player_by_id(action_table_player.player_id).stack).to eq 9900 # 1BB
      end

      it 'creates action log' do
        expect(subject.game_hand.game_actions.last.action_type).to eq 'call'
      end

      context 'UTG is short stack' do
        let(:utg_table_player) { create(:table_player, seat_no: 4, stack: 80) }

        it 'can call' do
          expect(subject.success?).to be_truthy
        end

        it 'reduces player\'s stack' do
          expect(subject.game_hand.game_hand_player_by_id(action_table_player.player_id).stack).to eq 0
        end

        it 'makes UTG allin state' do
          expect(subject.game_hand.game_hand_player_by_id(action_table_player.player_id).allin?).to be_truthy
        end
      end

      context 'other player tries action' do
        let(:action_table_player) { hj_table_player }

        it 'cannot call' do
          expect(subject.success?).to be_falsey
        end
      end
    end
  end
end
