require 'rails_helper'

# ショートオールインのテスト2
#
# 6max 50/100
#
# btn 10000
# sb 30(forced AI)
# bb 80(forced AI)
# utg 10000
# hj 10000
# co 10000
#
# preflop:
#   utg: fold
#   hj: fold
#   co: fold
#   btn: call(100)
#   sb: AI
#   bb: AI

describe :pattern_3 do
  context 'ブラインドの強制オールイン' do
    let(:table_player1) { create(:table_player, seat_no: 1, stack: 10000) } # btn: call
    let(:table_player2) { create(:table_player, seat_no: 2, stack: 30) } # sb: forced AI
    let(:table_player3) { create(:table_player, seat_no: 3, stack: 80) } # bb: forced AI
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
    let(:btn_table_player) { table_player1 }
    let(:sb_table_player) { table_player2 }
    let(:bb_table_player) { table_player3 }
    let(:utg_table_player) { table_player4 }
    let(:hj_table_player) { table_player5 }
    let(:co_table_player) { table_player6 }
    let(:table) { create(:table, table_players: table_players) }
    let(:game_hand) { GameManager.current_game_hand(table.id) }
    let(:command_runner) { CommandRunner.new(table) }

    before do
      # btn: 2s2c
      # sb: 8s8c
      # bb: 4s4c
      # utg: 5s5c
      # hj: 6s6c
      # co: 7s7c
      # board: 89TJA
      allow_any_instance_of(Poker::Deck).to receive(:draw).and_return(
        Poker::Card.new('2s'), # btn
        Poker::Card.new('2c'),
        Poker::Card.new('8s'), # sb
        Poker::Card.new('8c'),
        Poker::Card.new('4s'), # bb
        Poker::Card.new('4c'),
        Poker::Card.new('5s'), # utg
        Poker::Card.new('5c'),
        Poker::Card.new('6s'), # hj
        Poker::Card.new('6c'),
        Poker::Card.new('7s'), # co
        Poker::Card.new('7c'),
        Poker::Card.new('8s'), # board
        Poker::Card.new('9h'),
        Poker::Card.new('Td'),
        Poker::Card.new('Jc'),
        Poker::Card.new('As'),
      )

      CreateGameHandCommand.run(table_id: table.id, current_player_id: btn_table_player.player_id)

      # preflop
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_FOLD')
      command_runner.run(hj_table_player.player_id, 'PLAYER_ACTION_FOLD')
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_FOLD')
      command_runner.run(btn_table_player.player_id, 'PLAYER_ACTION_CALL')
    end

    it do
      expect(game_hand.current_state).to eq 'finished'
      expect(btn_table_player.reload.stack).to eq 9920
      expect(sb_table_player.reload.stack).to eq 90
      expect(bb_table_player.reload.stack).to eq 100
      expect(utg_table_player.reload.stack).to eq 10000
      expect(hj_table_player.reload.stack).to eq 10000
      expect(co_table_player.reload.stack).to eq 10000
    end
  end
end
