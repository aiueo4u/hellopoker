class NpcPlayer
  attr_reader :manager, :game_hand, :table_player

  PLAYER_ACTION_BET_CHIPS = 'PLAYER_ACTION_BET_CHIPS'
  PLAYER_ACTION_CALL = 'PLAYER_ACTION_CALL'
  PLAYER_ACTION_CHECK = 'PLAYER_ACTION_CHECK'
  PLAYER_ACTION_FOLD = 'PLAYER_ACTION_FOLD'
  PLAYER_ACTION_SHOW_HAND = 'PLAYER_ACTION_SHOW_HAND'
  PLAYER_ACTION_MUCK_HAND = 'PLAYER_ACTION_MUCK_HAND'

  def self.profile_by_npc_type
    {
      tanuki: { name: 'たぬき', profile_image_name: 'animalface_tanuki.png', },
      duck: { name: 'あひる', profile_image_name: 'animalface_duck.png' },
      nezumi: { name: 'ねずみ', profile_image_name: 'animalface_nezumi.png' },
      tora: { name: 'とら', profile_image_name: 'animalface_tora.png' },
      usagi: { name: 'うさぎ', profile_image_name: 'animalface_usagi.png' },
      zou: { name: 'ぞう', profile_image_name: 'animalface_zou.png' },
    }
  end

  def initialize(table_id, player_id)
    @manager = GameManager.new(table_id)
    @game_hand = @manager.game_hand
    @table_player = @game_hand.table_player_by_player_id(player_id)
  end

  def output
    type = amount = nil

    if manager.current_state == 'hand_open'
      weights = build_weights(show: 80, muck: 20)
      type = lot_by_weights(weights)
    else
      weights = action_candidates
      type = lot_by_weights(weights)
      amount = nil

      case type
      when PLAYER_ACTION_CALL
        amount = calc_amount_to_call
      when PLAYER_ACTION_BET_CHIPS
        amount = calc_amount_to_raise
      end
    end

    [type, amount]
  end

  private

  def action_candidates
    # 現ラウンドでチェック可能な時
    #   - 誰もベットしていない
    #   - BBオプション
    if calc_amount_to_call == 0
      # 現ラウンドまででオリジナルがいないor自身がオリジナル
      if !last_aggressive_player_id || last_aggressor?
        build_weights(check: 50, bet: 50)
      else
        build_weights(check: 50, bet: 5) # donk bet
      end
    # 現ラウンドで誰かがベットしている時
    else
      # レイズすることができない場合（オールイン要求されている場合）
      if calc_amount_to_call == calc_amount_to_raise
        build_weights(fold: 60, call: 40)
      # レイズすることができる場合
      else
        build_weights(fold: 30, call: 50, bet: 20)
      end
    end
  end

  def build_weights(check: 0, bet: 0, call: 0, fold: 0, show: 0, muck: 0)
    raise 'invalid' if [check, bet, call, fold, show, muck].sum == 0
    [
      [PLAYER_ACTION_BET_CHIPS, bet],
      [PLAYER_ACTION_CALL, call],
      [PLAYER_ACTION_CHECK, check],
      [PLAYER_ACTION_FOLD, fold],
      [PLAYER_ACTION_SHOW_HAND, show],
      [PLAYER_ACTION_MUCK_HAND, muck],
    ]
  end

  def current_stack
    current_game_hand_player.stack
  end

  def current_game_hand_player
    game_hand.game_hand_player_by_id(table_player.player_id)
  end

  def calc_amount_to_call
    game_hand.amount_to_call_by_player_id(table_player.player_id)
  end

  def calc_amount_to_raise
    amount_to_bet = calc_amount_to_call * 3
    amount_to_min_bet = game_hand.amount_to_min_bet_by_player_id(table_player.player_id)

    # 誰もレイズしていない場合
    return calc_amount_to_bet if amount_to_bet == 0

    # ミニマムレイズ額に達しない場合は所持スタック量（オールイン）
    return current_stack if current_stack < amount_to_min_bet

    # ベットしようとしている額がミニマムベット学に足りないのなら補正
    return amount_to_min_bet if amount_to_bet < amount_to_min_bet

    # ベットしようとしている額がスタックを超えるならオールイン
    return current_stack if amount_to_bet > current_stack

    amount_to_bet
  end

  def calc_amount_to_bet
    amount = game_hand.pot_amount / 2
    if amount % 10 != 0
      amount = (amount / 10) * 10
    end

    if amount > 1000
      amount = (amount / 100) * 100
    end

    amount_to_min_bet = game_hand.amount_to_min_bet_by_player_id(table_player.player_id)
    amount = amount_to_min_bet if amount < amount_to_min_bet

    [amount, current_stack].min
  end

  def lot_by_weights(weights)
    total = weights.map { |w| w[1] }.sum
    weights.each do |weight|
      if rand(total) < weight[1]
        return weight[0]
      else
        total -= weight[1]
      end
    end
    return weights[0][0]
  end

  def last_aggressor?
    last_aggressive_player_id == table_player.player_id
  end

  def last_aggressive_player_id
    unless @last_aggressive_player_id
      last_action_round = game_hand.last_action_state
      last_round_actions = game_hand.game_actions.group_by(&:state)[last_action_round]
      @last_aggressive_player_id = last_round_actions.select(&:bet?).sort_by(&:order_id).last&.player_id
    end
    @last_aggressive_player_id
  end
end
