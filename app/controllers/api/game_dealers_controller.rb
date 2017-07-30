class Api::GameDealersController < Api::ApplicationController
  before_action :check_jwt

  def create
    type = params[:type]
    table_id = params[:table_id].to_i
    player_id = params[:player_id].to_i
    amount = params[:amount].to_i

    # TODO: remove
    table = Table.find(table_id)
    game_hand = GameHand.where(table_id: table_id).order(id: :desc).first
    table_players = TablePlayer.where(table_id: table_id).sort_by(&:seat_no)

    case type
    when 'GAME_HAND_TAKE_POT'
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)

      total = 0

      min_bet_game_hand_player = game_hand.game_hand_players.select { |ghp| ghp.total_bet_amount > 0 }.min_by(&:total_bet_amount)
      amount_by_one = min_bet_game_hand_player.total_bet_amount
      game_hand.game_hand_players.each do |ghp|
        next unless ghp.total_bet_amount > 0
        total += amount_by_one
        ghp.total_bet_amount -= amount_by_one
        ghp.save!
      end

      table_player.stack += total
      amount = total # for Information

      game_hand.save!
      table_player.save!

      if game_hand.game_hand_players.sum(&:total_bet_amount) == 0
        game_hand.finished!
      end
    when 'PLAYER_ACTION_TAKE_SEAT'
      raise 'already seated' if player_id.in?(table_players.map(&:player_id))
      TablePlayer.create!(table_id: table_id, player_id: player_id, seat_no: params[:seat_no], stack: params[:buy_in_amount])
    when 'PLAYER_ACTION_FOLD'
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)
      check_your_action!(player_id) # 自分のアクションかチェック
      check_your_turn!(game_hand, table_player) # 自分のターンかチェック

      game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == player_id }
      game_hand_player.folded!

      # 次の人のターンにする
      update_game_hand_after_action(game_hand, table_players)
    when 'PLAYER_ACTION_CALL'
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)
      check_your_action!(player_id) # 自分のアクションかチェック
      check_your_turn!(game_hand, table_player) # 自分のターンかチェック

      # 本フェーズでの最高ベット額を取得
      max_bet_amount_in_state = game_hand.game_hand_players.max_by(&:bet_amount_in_state).bet_amount_in_state
      game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == player_id }
      amount_to_call = max_bet_amount_in_state - game_hand_player.bet_amount_in_state

      if table_player.stack < amount_to_call
        amount_to_call = table_player.stack
      end

      amount = amount_to_call # for Information

      table_player.stack -= amount_to_call
      table_player.save!

      game_hand_player.bet_amount_in_state = max_bet_amount_in_state
      game_hand_player.total_bet_amount += amount_to_call
      if table_player.stack == 0
        game_hand_player.state = GameHandPlayer.states[:allin]
      end
      game_hand_player.save!

      # 次の人のターンにする
      update_game_hand_after_action(game_hand, table_players)
    when 'PLAYER_ACTION_CHECK'
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)
      check_your_action!(player_id) # 自分のアクションかチェック
      check_your_turn!(game_hand, table_player) # 自分のターンかチェック

      # 次の人のターンにする
      update_game_hand_after_action(game_hand, table_players)
    when 'PLAYER_ACTION_BET_CHIPS'
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)

      check_your_action!(player_id) # 自分のアクションかチェック
      check_your_turn!(game_hand, table_player) # 自分のターンかチェック
      check_your_amount!(table_player, amount) # 残高チェック

      # プレイヤーのスタックからポットへとチップを移す
      table_player.stack -= amount
      table_player.save!
      game_hand.last_aggressive_seat_no = game_hand.current_seat_no
      game_hand.save!

      # 本フェーズのベット額を更新
      game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == player_id }
      game_hand_player.bet_amount_in_state += amount
      game_hand_player.total_bet_amount += amount
      if table_player.stack == 0
        game_hand_player.state = GameHandPlayer.states[:allin]
      end
      game_hand_player.save!

      # 次の人のターンにする
      update_game_hand_after_action(game_hand, table_players)
    when 'PLAYER_ACTION_ADD_CHIPS'
      # プレイヤーのスタックを増やす
      table_player = TablePlayer.find_by!(table_id: table_id, player_id: player_id)
      table_player.stack += amount
      table_player.save!
    when 'GAME_START'
      player_id = current_player.id

      # 新規ゲームの開始
      # ゲーム状態はプリプロップ
      game_hand = GameHand.new(
        table_id: table_id,
        state: GameHand.states[:preflop],
        bb_used_option: false
      )

      # この時点でテーブルに座っているプレイヤーを参加させる
      table_players = TablePlayer.where(table_id: table_id).to_a

      # 各プレイヤーにポジションを設定する
      # TODO: 毎ゲームごとのボタン移動対応
      table_players.sort_by(&:seat_no).each_with_index do |table_player, i|
        game_hand.game_hand_players.build(
          player_id: table_player.player_id,
          position: i + 1, # SB: 1, BB: 2, UTG: 3, ...
          bet_amount_in_state: 0,
          total_bet_amount: 0,
          state: GameHandPlayer.states[:active],
        )
      end

      # ボタン位置と最初のアクション位置を設定
      sorted_seat_nos = GameUtils.sort_seat_nos(table_players.map(&:seat_no), nil)
      sb_seat_no = sorted_seat_nos[0]
      bb_seat_no = sorted_seat_nos[1]
      if sorted_seat_nos.size == 2
        game_hand.current_seat_no = sorted_seat_nos[0]
        game_hand.button_seat_no = sorted_seat_nos[0]
      else
        game_hand.current_seat_no = sorted_seat_nos[2]
        game_hand.button_seat_no = sorted_seat_nos.last
      end

      # ブラインド徴収
      sb_table_player = table_players.find { |table_player| table_player.seat_no == sb_seat_no }
      sb_game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == sb_table_player.player_id }
      sb_amount = table.sb_size
      sb_table_player.stack -= sb_amount
      sb_table_player.save!
      sb_game_hand_player.bet_amount_in_state += sb_amount
      sb_game_hand_player.total_bet_amount += sb_amount

      bb_table_player = table_players.find { |table_player| table_player.seat_no == bb_seat_no }
      bb_game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == bb_table_player.player_id }
      bb_amount = table.bb_size
      bb_table_player.stack -= bb_amount
      bb_table_player.save!
      bb_game_hand_player.bet_amount_in_state += bb_amount
      bb_game_hand_player.total_bet_amount += bb_amount

      game_hand.save!
    else
    end

    # アクションが終わったら現在のゲーム状態を全員に送信
    ActionCableBroadcaster.broadcast_game_state(table_id)
    # アクション履歴も送信
    ActionCableBroadcaster.broadcast_information(table_id, player_id, type, amount)

    # リバー終了時
    if game_hand&.state == 'result'
      ActionCableBroadcaster.broadcast_game_result(game_hand)
    elsif game_hand&.state == 'finished'
      ActionCableBroadcaster.broadcast_game_finished(game_hand)
    end

    render json: {}
  end

  private

  def check_your_turn!(game_hand, table_player)
    raise "This is not your turn" unless table_player.seat_no == game_hand.current_seat_no
  end

  def check_your_action!(player_id)
    raise "invalid player_id: '#{player_id}'" unless player_id == current_player.id
  end

  def check_your_amount!(table_player, amount)
    raise "not enough stack to bet #{amount}" if table_player.stack < amount
  end

  def _calc_next_seat_no(game_hand, table_players)
    game_hand_player_by_seat_no = game_hand.game_hand_players.map do |game_hand_player|
      table_player = table_players.find { |table_player| table_player.player_id == game_hand_player.player_id }
      [table_player.seat_no, game_hand_player]
    end.to_h

    passed_button = false
    calc_seat_no = GameUtils.sort_seat_nos(table_players.map(&:seat_no), game_hand.current_seat_no).find do |seat_no|
      passed_button = true if game_hand.button_seat_no == seat_no
      game_hand_player_by_seat_no[seat_no]&.active? && game_hand.current_seat_no != seat_no
    end
    [calc_seat_no, passed_button]
  end

  # 次のアクションを行うシート番号を返す。nilの場合は次のフェーズへ。
  def calc_next_seat_no(game_hand, table_players)
    calc_seat_no, passed_button = _calc_next_seat_no(game_hand, table_players)

    if game_hand.last_aggressive_seat_no
      if calc_seat_no == game_hand.last_aggressive_seat_no
        return nil
      end
    elsif game_hand.preflop? && game_hand.bb_used_option?
      # ベットなどをしていたらlast_aggressive_seat_noがセットされているので、
      # ここはプリフロップでBBがオプションでチェックしたケース
      return nil
    else
      if game_hand.preflop?
        # プリフロップBBのオプション対応
        if table_players.size == 2
          bb_seat_no = GameUtils.sort_seat_nos(table_players.map(&:seat_no), game_hand.button_seat_no)[0]
        else
          bb_seat_no = GameUtils.sort_seat_nos(table_players.map(&:seat_no), game_hand.button_seat_no)[1]
        end

        if calc_seat_no == bb_seat_no && !game_hand.bb_used_option?
          game_hand.bb_used_option = true
          game_hand.save! # TODO: ここで保存しないほうが良さそう
          return calc_seat_no
        end
      else
        # 一つ前のアクションがボタンプレイヤーだったら次のフェーズへ
        if game_hand.button_seat_no == game_hand.current_seat_no
          return nil
        end
        # ボタンのプレイヤーを越していたら次のフェーズへ
        if  game_hand.button_seat_no != calc_seat_no && passed_button
          return nil
        end
      end
    end

    calc_seat_no
  end

  def update_game_hand_after_action(game_hand, table_players)
    next_seat_no = calc_next_seat_no(game_hand, table_players)

    if next_seat_no
      # フェーズ変わらないまま次のプレイヤーへ
      game_hand.current_seat_no = next_seat_no

      # TODO: 最適化
      # フォールド済みかオールインプレイヤーだった場合スキップ
      next_table_player = table_players.find { |table_player| table_player.seat_no == next_seat_no }
      next_game_hand_player = game_hand.game_hand_players.find { |ghp| ghp.player_id == next_table_player.player_id }
      if next_game_hand_player.folded? || next_game_hand_player.allin?
        #return update_game_hand_after_action(game_hand, table_players)
      end

      if game_hand.game_hand_players.select(&:active?).size <= 1
        game_hand.state = GameHand.states[:result]
      end

      game_hand.save!
    else
      # next phase
      game_hand_player_by_seat_no = game_hand.game_hand_players.map do |game_hand_player|
        table_player = table_players.find { |table_player| table_player.player_id == game_hand_player.player_id }
        [table_player.seat_no, game_hand_player]
      end.to_h
      next_seat_no = GameUtils.sort_seat_nos(table_players.map(&:seat_no), game_hand.button_seat_no).find do |seat_no|
        game_hand_player = game_hand_player_by_seat_no[seat_no]
        game_hand_player.active?
      end
      game_hand.update!(current_seat_no: next_seat_no, last_aggressive_seat_no: nil)
      game_hand.state = game_hand.next_state

      # コールされなかったベットを戻す
      max_bet_game_hand_player = game_hand.game_hand_players.max_by(&:total_bet_amount)
      max_bet_game_hand_players = game_hand.game_hand_players.select { |ghp| ghp.total_bet_amount == max_bet_game_hand_player.total_bet_amount }
      if max_bet_game_hand_players.size == 1
        second_bet_game_hand_player = game_hand.game_hand_players.select { |ghp| ghp.total_bet_amount != max_bet_game_hand_player.total_bet_amount }.max_by(&:total_bet_amount)
        diff = max_bet_game_hand_player.total_bet_amount - second_bet_game_hand_player.total_bet_amount
        max_bet_game_hand_player.total_bet_amount -= diff
        max_bet_game_hand_player.save!

        table_player = table_players.find { |tp| tp.player_id == max_bet_game_hand_player.player_id }
        table_player.stack += diff
        table_player.save!
      end

      game_hand.game_hand_players.each do |ghp|
        ghp.update!(bet_amount_in_state: 0)
      end

      if game_hand.game_hand_players.select(&:active?).size <= 1
        game_hand.state = GameHand.states[:result]
      end

      game_hand.save!
    end
  end
end
