class GameManager
  attr_reader :table_id, :game_hand, :player_id, :amount, :type, :last_action_state

  def self.create_new_game(table_id, player)
    # 新規ゲームの開始
    # ゲーム状態はプリプロップ
    game_hand = GameHand.new(table_id: table_id)

    # この時点でテーブルに座っているプレイヤーを参加させる
    game_hand.table_players.sort_by(&:seat_no).each do |table_player|
      game_hand.game_hand_players.build(player_id: table_player.player_id)
    end

    # 前のゲームのボタンポジションを取得
    last_button_seat_no = GameHand.where(table_id: table_id).order(:id).last&.button_seat_no
    if last_button_seat_no
      next_button_seat_no = GameUtils.sort_seat_nos(game_hand.table_players.map(&:seat_no), last_button_seat_no)[0]
    else
      next_button_seat_no = game_hand.table_players.last.seat_no
    end

    # ボタン位置と最初のアクション位置を設定
    sorted_seat_nos = GameUtils.sort_seat_nos(game_hand.table_players.map(&:seat_no), next_button_seat_no)
    if sorted_seat_nos.size == 2
      sb_seat_no = sorted_seat_nos[1]
      bb_seat_no = sorted_seat_nos[0]
    else
      sb_seat_no = sorted_seat_nos[0]
      bb_seat_no = sorted_seat_nos[1]
    end

    game_hand.button_seat_no = next_button_seat_no

    # ブラインド徴収
    table = Table.find(table_id)
    sb_table_player = game_hand.table_players.find { |table_player| table_player.seat_no == sb_seat_no }
    sb_amount = table.sb_size
    sb_table_player.stack -= sb_amount # TODO: ショートのときの対応
    game_hand.build_blind_action(sb_table_player.player_id, sb_amount, 'preflop')

    bb_table_player = game_hand.table_players.find { |table_player| table_player.seat_no == bb_seat_no }
    bb_amount = table.bb_size
    bb_table_player.stack -= bb_amount # TODO: ショートのときの対応
    game_hand.build_blind_action(bb_table_player.player_id, bb_amount, 'preflop')

    sb_table_player.save!
    bb_table_player.save!
    game_hand.save!
    self.new(table_id, player.id, 'GAME_START', 0, player.id)
  end

  def initialize(table_id, player_id, type, amount, request_player)
    @table_id = table_id
    @game_hand = GameHand.where(table_id: table_id).order(:id).last
    @player_id = player_id
    @type = type
    @amount = amount
    @request_player = request_player
  end

  def do_action
    # TODO: 消したい・・・
    @last_action_state = current_state

    case self.type
    when 'PLAYER_ACTION_CHECK'
      table_player = game_hand.table_player_by_player_id(player_id)
      check_your_turn!(table_player) # 自分のターンかチェック

      game_hand.build_check_action(player_id, current_state)
    when 'PLAYER_ACTION_BET_CHIPS'
      table_player = game_hand.table_player_by_player_id(player_id)
      check_your_turn!(table_player) # 自分のターンかチェック

      # TODO: 所持数チェック

      # プレイヤーのスタックからポットへとチップを移す
      table_player.stack -= amount
      table_player.save!

      # アクション生成
      game_hand.build_bet_action(player_id, amount, current_state)
    when 'PLAYER_ACTION_CALL'
      table_player = game_hand.table_player_by_player_id(player_id)
      check_your_turn!(table_player) # 自分のターンかチェック
      check_your_amount!(table_player, amount) # 残高チェック

      # 本フェーズでの最高ベット額を取得
      amount_to_call = game_hand.amount_to_call_by_table_player(table_player)

      # アクション生成
      game_hand.build_call_action(player_id, amount_to_call, current_state)

      table_player.stack -= amount_to_call
      table_player.save!
      @amount = amount_to_call
    when 'PLAYER_ACTION_FOLD'
      table_player = game_hand.table_player_by_player_id(player_id)
      check_your_turn!(table_player) # 自分のターンかチェック

      game_hand.build_fold_action(self.player_id, current_state)
    when 'UNDO_PLAYER_ACTION'
      if game_hand.game_actions.size == 2 # SB,BB
        # ゲーム開始直後
        game_hand.undo_action
        game_hand.save!
        game_hand.undo_action
        game_hand.destroy!
      elsif current_state == 'finished'
        # 結果ラウンドはまとめて全部UNDOする
        while true
          if game_hand.last_action.taken?
            game_hand.undo_action
            game_hand.save!
          else
            break
          end
        end
        # 最終アクションもUNDO
        game_hand.undo_action
      else
        game_hand.undo_action
      end
    when 'GAME_HAND_TAKE_POT'
      @amount = game_hand.create_taken_actions(player_id, current_state)
    else
      Rails.logger.warn("Unknown type: '#{type}'")
    end

    game_hand.save!
  end

  # そのラウンドの最初のアクションかどうか
  def round_first_action?
    return true unless game_hand
    return true unless game_hand.last_action
    current_state != game_hand.last_action.state
  end

  def broadcast_game_state
    game_hand_players_by_player_id = game_hand&.game_hand_players&.index_by(&:player_id) || {}
    dumped_actions = game_hand&.dump_actions || {}
    table_players = game_hand&.table_players || TablePlayer.where(table_id: table_id).to_a

    total_bet_amount_in_current_round = 0

    players_data = table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = game_hand_players_by_player_id[table_player.player_id]
      dumped_action = dumped_actions[table_player.player_id] || {}

      bet_amount_in_state = round_first_action? ? 0 : dumped_action['bet_amount_in_state'] || 0
      total_bet_amount_in_current_round += bet_amount_in_state

      bb_option_usable =
        game_hand && bb_seat_no == table_player.seat_no && !current_bb_used_option?

      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.image_url,
        stack: table_player.stack,
        seat_no: table_player.seat_no,
        position: game_hand&.position_by_seat_no(table_player.seat_no),
        state: dumped_action['player_state'],
        bet_amount_in_state: bet_amount_in_state,
        total_bet_amount: dumped_action['total_bet_amount'],
        bb_option_usable: bb_option_usable,
      }
    end

    # そのラウンドでベットされたチップはポットに含めない
    pot_amount = dumped_actions.sum { |_, action| action['total_bet_amount'] }
    pot_amount -= total_bet_amount_in_current_round

    data = {
      type: 'player_action',
      pot: pot_amount,
      game_hand_state: current_state,
      current_seat_no: current_seat_no,
      button_seat_no: game_hand&.button_seat_no,
      players: players_data,
      last_aggressive_seat_no: last_aggressive_seat_no,
      undoable: GameHand.where(table_id: table_id).exists?,
    }
    ActionCable.server.broadcast "chip_channel_#{table_id}", data
  end

  def broadcast_game_result
    # アクティブで、ベット額が一番少ないやつに合わせてポットを配分する
    dumped_actions = game_hand.dump_actions

    amount_by_one = game_hand.min_total_bet_amount_in_not_folded_players

    pot_game_hand_players = game_hand.game_hand_players.select { |ghp|
      action = dumped_actions[ghp.player_id]
      action && action['player_state'] != GameHand.player_states[:folded] && action['total_bet_amount'] > 0
    }

    players_data = game_hand.table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = pot_game_hand_players.find { |game_hand_player| game_hand_player.player_id == table_player.player_id }
      dumped_action = dumped_actions[table_player.player_id]
      next unless game_hand_player
      next if dumped_action['player_state'] == GameHand.player_states[:folded]
      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.image_url,
        seat_no: table_player.seat_no,
        position: game_hand&.position_by_seat_no(table_player.seat_no),
      }
    end.compact

    data = {
      type: 'game_hand',
      pot: dumped_actions.sum { |_, action| [action['total_bet_amount'], amount_by_one].min },
      players: players_data,
    }
    ActionCable.server.broadcast "chip_channel_#{game_hand.table_id}", data
  end

  def broadcast_game_finished
    data = {
      type: 'game_hand_finished',
    }
    ActionCable.server.broadcast "chip_channel_#{game_hand.table_id}", data
  end

  def broadcast
    broadcast_game_state
    if type # TODO: 良い感じに分離
      InformationBroadcaster.broadcast_info(game_hand, last_action_state, player_id, type, amount)
    end

    # リバー終了時
    if current_state == 'result'
      broadcast_game_result
    elsif current_state == 'finished'
      broadcast_game_finished
    end
  end

  def self.take_seat(table_id, player_id, seat_no, buy_in_amount)
    game_hand = GameHand.where(table_id: table_id).order(id: :desc).first

    if game_hand
      if player_id.in?(game_hand.table_players.map(&:player_id))
        raise 'already seated'
      end
    end

    TablePlayer.create!(
      table_id: table_id,
      player_id: player_id,
      seat_no: seat_no,
      stack: buy_in_amount
    )
  end

  # TODO: private

  def current_round_finished?
    sorted_seat_nos = GameUtils.sort_seat_nos(game_hand.seat_nos, game_hand.last_action_seat_no)
    calc_seat_no = sorted_seat_nos.find do |seat_no|
      game_hand.active_player_by_seat_no?(seat_no) && game_hand.last_action_seat_no != seat_no
    end

    current_round = game_hand.last_action.state
    current_round_actions = game_hand.all_actions.group_by(&:state)[current_round]
    last_aggressive_player_id = current_round_actions.select(&:bet?).last&.player_id
    last_aggressive_seat_no2 = game_hand.table_player_by_player_id(last_aggressive_player_id)&.seat_no
    if last_aggressive_seat_no2
      if calc_seat_no == last_aggressive_seat_no2
        return true
      end
    elsif current_round_actions.last.state == 'preflop' && current_bb_used_option?
      return true
    else
      if current_round_actions.last.state == 'preflop'
        if calc_seat_no == bb_seat_no && !current_bb_used_option?
          return false
        end
      else
        position = game_hand.position_by_seat_no(game_hand.last_action_seat_no)
        if calc_seat_no && game_hand.position_by_seat_no(calc_seat_no) < position
          return true
        end
      end
    end
    false
  end

  def current_state
    # ゲームが開始されていない場合
    # TODO: 使ってないかも。削除。
    return 'init' if game_hand.nil?

    # 精算が終了した場合
    # ゲーム開始時にはブラインドが支払われているので、初期状態でfinishedになることはない。
    return 'finished' if game_hand.dump_actions.sum { |_, action| action['total_bet_amount'] } == 0

    # 一人残して全員フォールドしている場合
    return 'result' if game_hand.last_one_player?

    # 現在のラウンドが終了している場合
    if current_round_finished?
      if game_hand.last_one_active_player?
        # 残りアクティブプレイヤーが一人だったら結果ラウンドへ
        return 'result'
      else
        # 次のラウンドへ突入
        return game_hand.next_state
      end
    end

    game_hand.last_action.state
  end

  def bb_seat_no
    if game_hand.seat_nos.size > 2
      GameUtils.sort_seat_nos(game_hand.seat_nos, game_hand.button_seat_no)[1]
    else
      game_hand.seat_nos.find { |seat_no| seat_no != game_hand.button_seat_no }
    end
  end

  def current_seat_no
    return nil if game_hand.nil?
    return nil if game_hand.last_one_player?
    return nil if game_hand.dump_actions.sum { |_, action| action['total_bet_amount'] } == 0

    # 現在のラウンドが終了している場合
    if current_round_finished?
      if game_hand.last_one_active_player?
        # 残りアクティブプレイヤーが一人だったら結果ラウンドへ
        return nil
      else
        # 次のラウンドに入るので、ボタンから最初にアクティブなプレイヤーの順番になる
        return GameUtils.sort_seat_nos(game_hand.seat_nos, game_hand.button_seat_no).find do |seat_no|
          game_hand.active_player_by_seat_no?(seat_no)
        end
      end
    end

    # 現在のラウンドが続行なので、最後にアクションしたプレイヤーから最初にアクティブなプレイヤーの順番になる
    GameUtils.sort_seat_nos(game_hand.seat_nos, game_hand.last_action_seat_no).find do |seat_no|
      game_hand.active_player_by_seat_no?(seat_no)
    end
  end

  def current_bb_used_option?
    bb_player_id = game_hand.player_id_by_seat_no(bb_seat_no)
    game_hand.all_actions.select do |action|
      action.preflop? && action.player_id == bb_player_id
    end.size >= 2
  end

  def last_aggressive_seat_no
    return nil if game_hand.nil?
    return nil if current_round_finished?

    last_aggressive_player_id = game_hand.all_actions.select do |action|
      action.state == current_state && (action.bet? || action.blind?)
    end.last&.player_id
    game_hand.table_player_by_player_id(last_aggressive_player_id)&.seat_no
  end

  def check_your_turn!(table_player)
    raise "This is not your turn" unless table_player.seat_no == current_seat_no
  end

  def check_your_amount!(table_player, amount)
    raise "not enough stack to bet #{amount}" if table_player.stack < amount
  end
end
