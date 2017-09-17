class GameHand < ApplicationRecord
  has_many :game_hand_players
  has_many :game_actions, autosave: true

  enum player_states: %i(
    active
    folded
    allin
  )

  enum action_types: %i(
    blind
    check
    bet
    call
    fold
    taken
  )

  MAX_PLAYER_NUM = 10

  def last_action
    game_actions.sort_by(&:order_id).last
  end

  def last_action_seat_no
    table_players.find { |tp| tp.player_id == last_action.player_id }.seat_no
  end

  def seat_nos
    game_hand_player_ids = game_hand_players.map(&:player_id)
    table_players.select { |tp| tp.player_id.in?(game_hand_player_ids) }.map(&:seat_no)
  end

  def player_id_by_seat_no(seat_no)
    table_players.find { |tp| tp.seat_no == seat_no }&.player_id
  end

  def last_one_active_player?
    dump_actions.values.select { |action| action['player_state'] == self.class.player_states[:active] }.size <= 1
  end
  
  def next_state
    if last_action.state == 'finished'
      nil
    else
      i = GameAction.states[last_action.state] + 1
      GameAction.states.keys[i]
    end
  end

  def active_player_by_seat_no?(seat_no)
    player_id = player_id_by_seat_no(seat_no)
    active_player?(player_id)
  end

  def folded_player_by_seat_no?(seat_no)
    player_id = player_id_by_seat_no(seat_no)
    folded_player?(player_id)
  end

  def folded_player?(player_id)
    game_hand_player = game_hand_players.find { |ghp| ghp.player_id == player_id }
    return false unless game_hand_player
    dumped_actions = dump_actions
    !dumped_actions[player_id] || dumped_actions[player_id]['player_state'] == self.class.player_states[:folded]
  end

  def active_player?(player_id)
    game_hand_player = game_hand_players.find { |ghp| ghp.player_id == player_id }
    return false unless game_hand_player
    dumped_actions = dump_actions
    !dumped_actions[player_id] || dumped_actions[player_id]['player_state'] == self.class.player_states[:active]
  end

  def participating_player?(player_id)
  end

  def table_players
    @table_players ||= TablePlayer.where(table_id: self.table_id).to_a
  end

  def table_player_by_player_id(player_id)
    table_players.find { |table_player| table_player.player_id == player_id }
  end

  def position_by_seat_no(seat_no)
    if seat_no > button_seat_no
      seat_no - button_seat_no
    else
      MAX_PLAYER_NUM - (button_seat_no - seat_no)
    end
  end

  def amount_to_call_by_table_player(table_player)
    dumped_actions = dump_actions
    max_bet_amount_in_state = dumped_actions.values.max_by {
      |action| action['bet_amount_in_state']
    }['bet_amount_in_state']
    amount_to_call = max_bet_amount_in_state

    if dumped_actions[table_player.player_id]
      amount_to_call -= dumped_actions[table_player.player_id]['bet_amount_in_state']
    end

    if table_player.stack < amount_to_call
      amount_to_call = table_player.stack
    end
    amount_to_call
  end

  def all_actions
    self.game_actions
  end

  # TODO
  def state
    last_action.state
  end

  def dump_actions
    actions_by_player_id = self.game_actions.group_by(&:player_id)

    dumped_actions = {}
    actions_by_player_id.each do |player_id, actions|
      next if player_id.nil?

      # 現在のラウンドでのベット額
      bet_amount_in_state = 0
      # 実際に賭けたトータルのベット額
      total_bet_amount = 0
      # 他プレイヤーにテイクされていない実効ベット額
      # - サイドポット発生時等に有効
      effective_total_bet_amount = 0
      actions.each do |action|
        if action.action_type.in?(%w(blind call bet))
          total_bet_amount += action.amount
          effective_total_bet_amount += action.amount
          if action.state == self.state
            bet_amount_in_state += action.amount
          end
        # 他プレイヤーにテイクされた分を実効ベット額から引く
        elsif action.action_type == 'taken' && action.amount < 0
          effective_total_bet_amount += action.amount
        end
      end

      last_action_type = actions.max_by(&:order_id).action_type

      game_hand_player = game_hand_players.find { |ghp| ghp.player_id == player_id }

      table_player = table_player_by_player_id(player_id)
      taken_amount = actions.select(&:result?).sum(&:amount)
      is_allin = (table_player.stack - taken_amount) == 0

      player_state = nil
      if game_hand_player
        if last_action_type == 'fold'
          player_state = self.class.player_states[:folded]
        else
          if is_allin
            player_state = self.class.player_states[:allin]
          else
            player_state = self.class.player_states[:active]
          end
        end
      end

      round = actions.last.state

      dumped_actions[player_id] = {
        'bet_amount_in_state' => bet_amount_in_state,
        'total_bet_amount' => total_bet_amount,
        'effective_total_bet_amount' => effective_total_bet_amount,
        'player_state' => player_state,
        'round' => round,
      }
    end
    dumped_actions
  end

  def next_order_id
    game_actions.size + 1
  end

  def build_taken_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:taken],
      amount: amount
    )
  end

  def build_blind_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:blind],
      amount: amount
    )
  end

  def build_fold_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:fold]
    )
  end

  def build_check_action(player_id, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:check]
    )
  end

  def build_call_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:call],
      amount: amount
    )
  end

  def build_bet_action(player_id, amount, state)
    game_actions.build(
      order_id: next_order_id,
      state: state,
      player_id: player_id,
      action_type: self.class.action_types[:bet],
      amount: amount
    )
  end

  def undo_action
    last_action.mark_for_destruction
    if last_action.action_type.in?(%w(call bet blind))
      update_player_stack!(last_action.player_id, last_action.amount)
    elsif last_action.taken? && last_action.amount > 0
      update_player_stack!(last_action.player_id, -1 * last_action.amount)
    end
  end

  def min_total_bet_amount_in_not_folded_players
    dump_actions.values.select { |action|
      action['player_state'] != self.class.player_states[:folded] && action['effective_total_bet_amount'] > 0
    }.min_by { |action| action['effective_total_bet_amount'] }['effective_total_bet_amount']
  end

  def update_player_stack!(player_id, amount)
    table_player = table_players.find { |tp| tp.player_id == player_id }
    table_player.stack += amount
    table_player.save!
  end

  def create_taken_actions(winning_player_id, current_state)
    total = 0

    min_total_bet_amount_in_not_folded_players = self.min_total_bet_amount_in_not_folded_players

    dump_actions.each do |action_player_id, action|
      eff_total_bet_amount = action['effective_total_bet_amount']
      next unless eff_total_bet_amount > 0

      # ポット獲得権利があるプレイヤー
      if eff_total_bet_amount >= min_total_bet_amount_in_not_folded_players
        total += min_total_bet_amount_in_not_folded_players
        # 取得版
        self.build_taken_action(winning_player_id, min_total_bet_amount_in_not_folded_players, current_state)
        # 奪われた版
        self.build_taken_action(action_player_id, -1 * min_total_bet_amount_in_not_folded_players, current_state)
      # フォールド済みでポット獲得権利がないプレイヤー
      else
        total += eff_total_bet_amount
        # 取得版
        self.build_taken_action(winning_player_id, eff_total_bet_amount, current_state)
        # 奪われた版
        self.build_taken_action(action_player_id, -1 * eff_total_bet_amount, current_state)
      end
    end

    self.update_player_stack!(winning_player_id, total)
    self.save!

    total
  end
end
