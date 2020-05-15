# TODO: GameManagerからincludeされる前提
module GameBroadcaster
  def broadcast
    broadcast_game_state
  end

  private

  def broadcast_game_state
    game_hand_players_by_player_id = game_hand&.game_hand_players&.index_by(&:player_id) || {}
    table_players = game_hand&.table_players || TablePlayer.where(table_id: table_id).to_a

    total_bet_amount_in_current_round = 0

    # カード配布モードでの結果ラウンド
    show_or_muck_by_player_id = {}
    if current_state == 'result' || current_state == 'finished'
      game_hand_players_in_result = game_hand.game_hand_players.reject(&:folded?) 

      # All-inプレイヤーがいたらマックできない
      if game_hand.game_hand_players.any?(&:allin?) && !game_hand.skip_showdown?
        game_hand_players_in_result.each do |ghp|
          show_or_muck_by_player_id[ghp.player_id] = true
        end
      else
        game_hand_players_in_result.each do |ghp|
          # All-inプレイヤーはマックできない
          if ghp.allin? && !game_hand.skip_showdown?
            show_or_muck_by_player_id[ghp.player_id] = true
          elsif ghp.show_hand?
            show_or_muck_by_player_id[ghp.player_id] = true
          elsif ghp.muck_hand?
            show_or_muck_by_player_id[ghp.player_id] = false
          end
        end
      end
    end

    result_by_player_id = game_hand ? game_hand.dump_result_actions : {}

    players_data = table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = game_hand_players_by_player_id[table_player.player_id]

      bet_amount_in_state = game_hand_player&.bet_amount_by_state(game_hand.current_state) || 0
      total_bet_amount_in_current_round += bet_amount_in_state

      bb_option_usable =
        game_hand && bb_seat_no == table_player.seat_no && !game_hand.current_bb_used_option?

      if show_or_muck_by_player_id[table_player.player.id]
        cards = [
          { rank: game_hand_player.card1_id[0], suit: game_hand_player.card1_id[1] },
          { rank: game_hand_player.card2_id[0], suit: game_hand_player.card2_id[1] },
        ]
      else
        cards = []
      end

      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.profile_image_url,
        stack: game_hand_player&.stack || table_player.stack,
        seat_no: table_player.seat_no,
        position: game_hand&.position_by_seat_no(table_player.seat_no),
        state: game_hand_player&.player_state,
        bet_amount_in_state: bet_amount_in_state,
        total_bet_amount: game_hand_player&.total_bet_amount,
        bb_option_usable: bb_option_usable,
        hand_show: show_or_muck_by_player_id[table_player.player.id],
        cards: cards,
        remain_time_to_action: GameAction::ACTION_TIMEOUT - (Time.current - (game_hand&.last_action&.created_at || Time.current)),
        max_remain_time_to_action: GameAction::ACTION_TIMEOUT,
        amount_diff: (result_by_player_id[table_player.player.id] || {})['amount_diff'],
      }
    end

    # そのラウンドでベットされたチップはポットに含めない
    pot_amount = game_hand&.game_hand_players&.sum(&:effective_total_bet_amount) || 0
    pot_amount -= total_bet_amount_in_current_round

    game_hand_count = GameHand.where(table_id: table_id).count
    table = Table.find(table_id)

    reached_rounds = {}
    reaching_rounds = []
    if game_hand
      game_hand.all_actions.map(&:state).uniq.each do |state|
        reached_rounds[state] = true
      end
      reached_rounds[current_state] = true

      # オールイン勢が揃って、あとはボードをめくるだけのとき
      view_allin_animation = game_hand.game_hand_players.any?(&:allin?) && current_state == 'finished' && !game_hand.skip_showdown?

      if view_allin_animation
        if !reached_rounds['flop']
          reaching_rounds << 'flop'
          reached_rounds['flop'] = true
        end
        if !reached_rounds['turn']
          reaching_rounds << 'turn'
          reached_rounds['turn'] = true
        end
        if !reached_rounds['river']
          reaching_rounds << 'river'
          reached_rounds['river'] = true
        end
      end
    end

    last_action = nil
    if game_hand
      last_action = game_hand.game_actions.select { |action| !action.taken? }.sort_by(&:order_id).last
    end

    data = {
      type: 'player_action',
      pot: pot_amount,
      game_hand_state: current_state,
      current_seat_no: game_hand&.current_seat_no,
      button_seat_no: game_hand&.button_seat_no,
      players: players_data,
      last_aggressive_seat_no: last_aggressive_seat_no,
      undoable: GameHand.where(table_id: table_id).exists?,
      game_hand_count: game_hand_count,
      board_cards: build_board_cards(game_hand, current_state),
      show_or_muck: current_state == 'result' && !game_hand&.no_more_action?,
      reached_rounds: reached_rounds,
      reaching_rounds: reaching_rounds,
      last_action: last_action,
      just_actioned: just_actioned,
      table_id: table_id,
    }
    ActionCable.server.broadcast "chip_channel_#{table_id}", data

    table_players.each do |table_player|
      game_hand_player = game_hand_players_by_player_id[table_player.player_id]
      cards = if game_hand_player
                [
                  { rank: game_hand_player.card1_id[0], suit: game_hand_player.card1_id[1] },
                  { rank: game_hand_player.card2_id[0], suit: game_hand_player.card2_id[1] },
                ]
              else
                []
              end
      data = { player_id: table_player.player_id, cards: cards }
      ActionCable.server.broadcast "dealt_card_channel_#{table_id}_#{table_player.player_id}", data
    end
  end

  def build_board_cards(game_hand, current_state)
    return [] unless game_hand

    if current_state == 'flop'
      return [
        game_hand.board_card1_id,
        game_hand.board_card2_id,
        game_hand.board_card3_id,
      ]
    end

    if current_state == 'turn'
      return [
        game_hand.board_card1_id,
        game_hand.board_card2_id,
        game_hand.board_card3_id,
        game_hand.board_card4_id,
      ]
    end

    if current_state.in?(%w(river result finished))
      return [
        game_hand.board_card1_id,
        game_hand.board_card2_id,
        game_hand.board_card3_id,
        game_hand.board_card4_id,
        game_hand.board_card5_id,
      ]
    end

    []
  end
end
