class Broadcaster
  attr_reader :manager

  def initialize(manager)
    @manager = manager
  end

  def broadcast_chip_channel
    reached_rounds, reaching_rounds = build_reach_rounds

    data = {
      type: 'player_action',
      pot: pot_amount,
      game_hand_state: current_state,
      current_seat_no: game_hand&.current_seat_no,
      button_seat_no: game_hand&.button_seat_no,
      players: build_players_data,
      last_aggressive_seat_no: manager.last_aggressive_seat_no, # TODO
      undoable: GameHand.where(table: table).exists?,
      game_hand_count: game_hand_count,
      board_cards: build_board_cards(game_hand, current_state),
      show_or_muck: current_state == 'result' && !game_hand&.no_more_action?,
      reached_rounds: reached_rounds,
      reaching_rounds: reaching_rounds,
      last_action: last_action,
      just_actioned: manager.just_actioned,
      table_id: table.id,
      table: {
        id: table.id,
        name: table.name,
        sb_size: table.current_sb_size,
        bb_size: table.current_bb_size,
      },
    }

    if table.tournament?
      data[:tournament] = {
        id: table.tournament.id,
        is_started: table.tournament.started?,
        current_blind_structure: table.tournament.current_blind_structure,
      }
    end
    ActionCable.server.broadcast "chip_channel_#{table.id}", data
  end

  def broadcast_dealt_card_channel
    table_players.each do |table_player|
      game_hand_player = game_hand_player_by_player_id[table_player.player_id]
      cards = if game_hand_player
                [
                  { rank: game_hand_player.card1_id[0], suit: game_hand_player.card1_id[1] },
                  { rank: game_hand_player.card2_id[0], suit: game_hand_player.card2_id[1] },
                ]
              else
                []
              end
      data = { player_id: table_player.player_id, cards: cards, just_created: manager.just_created }
      ActionCable.server.broadcast "dealt_card_channel_#{table.id}_#{table_player.player_id}", data
    end
  end

  private

  def table
    manager.table
  end

  def build_players_data
    table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = game_hand_player_by_player_id[table_player.player_id]
      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.profile_image_url,
        stack: game_hand_player&.stack || table_player.stack,
        seat_no: table_player.seat_no,
        position: game_hand&.position_by_seat_no(table_player.seat_no),
        state: game_hand_player&.player_state,
        bet_amount_in_state: bet_amount_in_state_by_player_id(table_player.player_id),
        total_bet_amount: game_hand_player&.total_bet_amount,
        bb_option_usable: bb_option_usable_by_table_player?(table_player),
        hand_show: show_or_muck_by_player_id[table_player.player.id],
        cards: build_cards(game_hand_player),
        remain_time_to_action: remain_time_to_action,
        max_remain_time_to_action: GameAction::ACTION_TIMEOUT,
        amount_diff: amount_diff_by_player_id(table_player.player_id),
      }
    end
  end

  def current_state
    game_hand&.current_state
  end

  def last_action
    return unless game_hand
    game_hand.game_actions.select { |action| !action.taken? }.sort_by(&:order_id).last
  end

  def total_bet_amount_in_current_round
    table_players.map(&:player_id).map { |player_id| bet_amount_in_state_by_player_id(player_id) }.sum
  end

  # そのラウンドでベットされたチップはポットに含めない
  def pot_amount
    total_bet_amount = game_hand&.game_hand_players&.sum(&:effective_total_bet_amount) || 0
    total_bet_amount - total_bet_amount_in_current_round
  end

  def game_hand_count
    GameHand.where(table: table).count
  end

  def build_reach_rounds
    reached_rounds = {}
    reaching_rounds = []

    return [reached_rounds, reaching_rounds] unless game_hand

    game_hand.all_actions.map(&:state).uniq.each do |state|
      reached_rounds[state] = true
    end
    reached_rounds[game_hand.current_state] = true

    # オールイン勢が揃って、あとはボードをめくるだけのとき
    view_allin_animation = game_hand.game_hand_players.any?(&:allin?) &&
      game_hand.current_state == 'finished' &&
      !game_hand.skip_showdown?

    return [reached_rounds, reaching_rounds] unless view_allin_animation

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

    [reached_rounds, reaching_rounds]
  end

  def amount_diff_by_player_id(player_id)
    return unless game_hand
    return unless game_hand.dump_result_actions[player_id]
    game_hand.dump_result_actions[player_id]['amount_diff']
  end

  def game_hand
    manager.game_hand
  end

  def table_players
    @table_players ||= game_hand&.table_players || TablePlayer.where(table: table).to_a
  end

  def game_hand_player_by_player_id
    @game_hand_player_by_player_id ||= game_hand&.game_hand_players&.index_by(&:player_id) || {}
  end

  def bet_amount_in_state_by_player_id(player_id)
    game_hand_player_by_player_id[player_id]&.bet_amount_by_state(game_hand.current_state) || 0
  end

  def bb_option_usable_by_table_player?(table_player)
    game_hand && manager.bb_seat_no == table_player.seat_no && !game_hand.current_bb_used_option?
  end

  def show_or_muck_by_player_id
    return @show_or_muck_by_player_id if @show_or_muck_by_player_id
    @show_or_muck_by_player_id = {}

    return @show_or_muck_by_player_id unless game_hand

    if  game_hand.current_state != 'result' && game_hand.current_state != 'finished'
      return @show_or_muck_by_player_id
    end

    game_hand_players_in_result = game_hand.game_hand_players.reject(&:folded?) 

    # All-inプレイヤーがいたらマックできない
    if game_hand.game_hand_players.any?(&:allin?) && !game_hand.skip_showdown?
      game_hand_players_in_result.each do |ghp|
        @show_or_muck_by_player_id[ghp.player_id] = true
      end
      return @show_or_muck_by_player_id
    end

    game_hand_players_in_result.each do |ghp|
      # All-inプレイヤーはマックできない
      if ghp.allin? && !game_hand.skip_showdown?
        @show_or_muck_by_player_id[ghp.player_id] = true
      elsif ghp.show_hand?
        @show_or_muck_by_player_id[ghp.player_id] = true
      elsif ghp.muck_hand?
        @show_or_muck_by_player_id[ghp.player_id] = false
      end
    end

    @show_or_muck_by_player_id
  end

  def build_cards(game_hand_player)
    return [] unless game_hand_player
    return [] unless show_or_muck_by_player_id[game_hand_player.player_id]
    [
      { rank: game_hand_player.card1_id[0], suit: game_hand_player.card1_id[1] },
      { rank: game_hand_player.card2_id[0], suit: game_hand_player.card2_id[1] },
    ]
  end

  # TODO: 現在のプレイヤー限定
  def remain_time_to_action
    GameAction::ACTION_TIMEOUT - (Time.current - (game_hand&.last_action&.created_at || Time.current))
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
