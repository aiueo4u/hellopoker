require 'rails_helper'

# サイドポットのテスト
#   - UTG: 10000: 4th
#   - CO: 8000: 3rd
#   - BTN: 6000: 2nd
#   - BB: 4000: 1st

describe :pattern_5 do
  context 'サイドポット' do
    let(:table_player1) { create(:table_player, seat_no: 1, stack: 6000) } # BTN
    let(:table_player2) { create(:table_player, seat_no: 2, stack: 10000) } # SB
    let(:table_player3) { create(:table_player, seat_no: 3, stack: 4000) } # BB
    let(:table_player4) { create(:table_player, seat_no: 4, stack: 10000) }
    let(:table_player5) { create(:table_player, seat_no: 5, stack: 10000) }
    let(:table_player6) { create(:table_player, seat_no: 6, stack: 8000) } # CO
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
      # sb: 3s3c
      # bb: 4s4c
      # utg: 5s5c
      # hj: 6s6c
      # co: 7s7c
      # board: 9s9h9d9cAs
      allow_any_instance_of(Poker::Deck).to receive(:draw).and_return(
        Poker::Card.new('Ad'), # btn
        Poker::Card.new('Jd'),
        Poker::Card.new('3s'), # sb
        Poker::Card.new('3c'),
        Poker::Card.new('Ks'), # bb
        Poker::Card.new('Qc'),
        Poker::Card.new('5s'), # utg
        Poker::Card.new('5c'),
        Poker::Card.new('6s'), # hj
        Poker::Card.new('6c'),
        Poker::Card.new('7s'), # co
        Poker::Card.new('7c'),
        Poker::Card.new('9s'), # board
        Poker::Card.new('9h'),
        Poker::Card.new('Td'),
        Poker::Card.new('Jc'),
        Poker::Card.new('As'),
      )

      CreateGameHandCommand.run(table_id: table.id, current_player_id: btn_table_player.player_id)

      # preflop
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_BET_CHIPS', 200)
      command_runner.run(hj_table_player.player_id, 'PLAYER_ACTION_FOLD')
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(btn_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(sb_table_player.player_id, 'PLAYER_ACTION_FOLD')
      command_runner.run(bb_table_player.player_id, 'PLAYER_ACTION_BET_CHIPS', 3900) # BB allin
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(btn_table_player.player_id, 'PLAYER_ACTION_CALL')

      # flop
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_BET_CHIPS', 1000)
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(btn_table_player.player_id, 'PLAYER_ACTION_BET_CHIPS', 2000) # BTN allin
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_CALL')
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_CALL')

      # turn
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_CHECK')
      command_runner.run(co_table_player.player_id, 'PLAYER_ACTION_BET_CHIPS', 2000) # CO allin
      command_runner.run(utg_table_player.player_id, 'PLAYER_ACTION_CALL')
    end

    it do
      expect(game_hand.current_state).to eq 'finished'
      expect(utg_table_player.reload.stack).to eq 2000
      expect(co_table_player.reload.stack).to eq 4000
      expect(btn_table_player.reload.stack).to eq 6000
      expect(bb_table_player.reload.stack).to eq 16050
    end
  end
end
