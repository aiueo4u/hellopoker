module ActionCableBroadcaster
  def self.broadcast_game_finished(game_hand)
    data = {
      type: 'game_hand_finished',
    }
    ActionCable.server.broadcast "chip_channel_#{game_hand.table_id}", data
  end

  def self.broadcast_game_result(game_hand)
    # ベット額が一番少ないやつに合わせてポットを配分する
    min_bet_game_hand_player = game_hand.game_hand_players.select { |ghp| ghp.total_bet_amount > 0 }.min_by(&:total_bet_amount)
    amount_by_one = min_bet_game_hand_player.total_bet_amount
    pot_game_hand_players = game_hand.game_hand_players.select { |game_hand_player| game_hand_player.total_bet_amount > 0 }

    table_players = TablePlayer.where(table_id: game_hand.table_id).to_a

    players_data = table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = pot_game_hand_players.find { |game_hand_player| game_hand_player.player_id == table_player.player_id }
      next unless game_hand_player
      next if game_hand_player.folded?
      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.image_url,
        seat_no: table_player.seat_no,
        position: game_hand_player&.position,
      }
    end.compact

    data = {
      type: 'game_hand',
      pot: amount_by_one * pot_game_hand_players.size,
      players: players_data,
    }
    ActionCable.server.broadcast "chip_channel_#{game_hand.table_id}", data
  end

  def self.broadcast_information(table_id, player_id, type, amount)
    game_hand = GameHand.where(table_id: table_id).order(id: :desc).first || GameHand.new(table_id: table_id)
    table_player = TablePlayer.find_by(player_id: player_id)
    data = {
      type: 'info',
      info_type: 'player_action',
      player_action_type: type,
      time: Time.current.strftime('%Y/%m/%d %H:%M'),
      table_id: table_id,
      player_id: player_id,
      nickname: table_player.player.nickname,
      image_url: table_player.player.image_url,
      amount: amount,
      pot: game_hand.game_hand_players.sum(&:total_bet_amount)
    }

    ActionCable.server.broadcast "information_channel_#{table_id}", data
  end

  def self.broadcast_game_state(table_id)
    game_hand = GameHand.where(table_id: table_id).order(id: :desc).first# || GameHand.new(table_id: table_id)
    table_players = TablePlayer.where(table_id: table_id).to_a
    game_hand_players_by_player_id = game_hand&.game_hand_players&.index_by(&:player_id) || {}

    players_data = table_players.sort_by(&:seat_no).map do |table_player|
      game_hand_player = game_hand_players_by_player_id[table_player.player_id]
      {
        id: table_player.player.id,
        nickname: table_player.player.nickname,
        image_url: table_player.player.image_url,
        stack: table_player.stack,
        seat_no: table_player.seat_no,
        position: game_hand_player&.position,
        state: game_hand_player&.state,
        bet_amount_in_state: game_hand_player&.bet_amount_in_state,
        total_bet_amount: game_hand_player&.total_bet_amount,
      }
    end

    data = {
      type: 'player_action',
      pot: game_hand&.game_hand_players&.sum(&:total_bet_amount),
      game_hand_state: game_hand&.state,
      current_seat_no: game_hand&.current_seat_no,
      button_seat_no: game_hand&.button_seat_no,
      players: players_data,
      last_aggressive_seat_no: game_hand&.last_aggressive_seat_no,
    }
    ActionCable.server.broadcast "chip_channel_#{table_id}", data
  end
end
