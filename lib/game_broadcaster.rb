# TODO: GameManagerからincludeされる前提
module GameBroadcaster
  def broadcast_game_state
    game_hand_players_by_player_id = game_hand&.game_hand_players&.index_by(&:player_id) || {}
    dumped_actions = game_hand&.dump_actions || {}
    table_players = game_hand&.table_players || TablePlayer.where(table_id: table_id).to_a

    total_bet_amount_in_current_round = 0

    # カード配布モードでの結果ラウンド
    show_or_muck_by_player_id = {}
    if current_state == 'result' || current_state == 'finished'
      game_hand_players_in_result = game_hand.game_hand_players.select { |ghp|
        action = dumped_actions[ghp.player_id]
        action && action['player_state'] != GameHand.player_states[:folded]
      }

      # All-inプレイヤーがいたらマックできない
      if dumped_actions.any? { |_player_id, action| action['player_state'] == GameHand.player_states[:allin] }
        game_hand_players_in_result.each do |ghp|
          show_or_muck_by_player_id[ghp.player_id] = true
        end
      else
        game_hand_players_in_result.each do |ghp|
          action = dumped_actions[ghp.player_id]

          # All-inプレイヤーはマックできない
          if action['player_state'] == GameHand.player_states[:allin]
            show_or_muck_by_player_id[ghp.player_id] = true
          elsif action['show_hand']
            show_or_muck_by_player_id[ghp.player_id] = true
          elsif action['muck_hand']
            show_or_muck_by_player_id[ghp.player_id] = false
          end
        end
      end
    end

    result_by_player_id = game_hand ? game_hand.dump_result_actions : {}

    players_data = table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = game_hand_players_by_player_id[table_player.player_id]
      dumped_action = dumped_actions[table_player.player_id] || {}

      bet_amount_in_state = round_first_action? ? 0 : dumped_action['bet_amount_in_state'] || 0
      total_bet_amount_in_current_round += bet_amount_in_state

      bb_option_usable =
        game_hand && bb_seat_no == table_player.seat_no && !current_bb_used_option?

      if game_hand&.next_state == 'finished'
        player_state = nil
      else
        player_state = dumped_action['player_state']
      end

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
        stack: table_player.stack,
        seat_no: table_player.seat_no,
        position: game_hand&.position_by_seat_no(table_player.seat_no),
        state: player_state,
        bet_amount_in_state: bet_amount_in_state,
        total_bet_amount: dumped_action['total_bet_amount'],
        bb_option_usable: bb_option_usable,
        hand_show: show_or_muck_by_player_id[table_player.player.id],
        cards: cards,
        remain_time_to_action: GameAction::ACTION_TIMEOUT - (Time.current - (game_hand&.last_action&.created_at || Time.current)),
        max_remain_time_to_action: GameAction::ACTION_TIMEOUT,
        amount_diff: (result_by_player_id[table_player.player.id] || {})['amount_diff'],
      }
    end

    # そのラウンドでベットされたチップはポットに含めない
    pot_amount = dumped_actions.sum { |_, action| action['effective_total_bet_amount'] }
    pot_amount -= total_bet_amount_in_current_round

    game_hand_count = GameHand.where(table_id: table_id).count
    table = Table.find(table_id)

    board_cards = []
    if game_hand
      case current_state
      when 'flop'
        board_cards = [
          game_hand.board_card1_id,
          game_hand.board_card2_id,
          game_hand.board_card3_id,
        ]
      when 'turn'
        board_cards = [
          game_hand.board_card1_id,
          game_hand.board_card2_id,
          game_hand.board_card3_id,
          game_hand.board_card4_id,
        ]
      when 'river'
        board_cards = [
          game_hand.board_card1_id,
          game_hand.board_card2_id,
          game_hand.board_card3_id,
          game_hand.board_card4_id,
          game_hand.board_card5_id,
        ]
      when 'result'
        board_cards = [
          game_hand.board_card1_id,
          game_hand.board_card2_id,
          game_hand.board_card3_id,
          game_hand.board_card4_id,
          game_hand.board_card5_id,
        ]
      when 'finished'
        board_cards = [
          game_hand.board_card1_id,
          game_hand.board_card2_id,
          game_hand.board_card3_id,
          game_hand.board_card4_id,
          game_hand.board_card5_id,
        ]
      end
    end

    reached_rounds = {}
    reaching_rounds = []
    if game_hand
      game_hand.all_actions.map(&:state).uniq.each do |state|
        reached_rounds[state] = true
      end
      reached_rounds[current_state] = true

      # オールイン勢が揃って、あとはボードをめくるだけのとき
      is_allin = game_hand.game_hand_players.select { |ghp|
        !game_hand.folded_player?(ghp.player_id)
      }.size > 1 && current_state == 'finished' && type == 'PLAYER_ACTION_CALL'

      if is_allin
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
      current_seat_no: current_seat_no,
      button_seat_no: game_hand&.button_seat_no,
      players: players_data,
      last_aggressive_seat_no: last_aggressive_seat_no,
      undoable: GameHand.where(table_id: table_id).exists?,
      game_hand_count: game_hand_count,
      board_cards: board_cards,
      show_or_muck: current_state == 'result' && !player_hand_fixed?,
      reached_rounds: reached_rounds,
      reaching_rounds: reaching_rounds,
      last_action: last_action,
      just_actioned: type.present?,
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

  # カード配布モードの結果発表モーダル表示
  def broadcast_game_result_with_cards
    dumped_result_actions = game_hand.dump_result_actions

    players_data = dumped_result_actions.map do |player_id, action|
      table_player = game_hand.table_player_by_player_id(player_id)
      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.profile_image_url,
        seat_no: table_player.seat_no,
        position: game_hand.position_by_seat_no(table_player.seat_no),
        stack_before: table_player.stack - action['amount_diff'],
        stack_after: table_player.stack,
        amount_diff: action['amount_diff'],
      }
    end

    data = {
      type: 'show_result_dialog',
      players: players_data,
    }
    ActionCable.server.broadcast "chip_channel_#{game_hand.table_id}", data
  end

  def broadcast
    broadcast_game_state

    # if type # TODO: 良い感じに分離
    #   InformationBroadcaster.broadcast_info(game_hand, last_action_state, player_id, type, amount)
    # end

    # リバー終了時
    if @broadcast_result
      broadcast_game_result_with_cards
    end
  end
end
