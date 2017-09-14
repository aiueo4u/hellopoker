module InformationBroadcaster
  def self.broadcast_entering(table_id, player, time: Time.current)
    broadcast_data = {
      type: 'info',
      info_type: 'entered',
      nickname: player.nickname,
      time: format_time(time),
    }
    ActionCable.server.broadcast stream_name(table_id), broadcast_data
  end

  def self.broadcast_leaving(table_id, player, time: Time.current)
    broadcast_data = {
      type: 'info',
      info_type: 'leaving',
      nickname: player.nickname,
      time: format_time(time),
    }
    ActionCable.server.broadcast stream_name(table_id), broadcast_data
  end

  def self.broadcast_info(game_hand, round, player_id, type, amount, time: Time.current)
    return if game_hand.nil?
    table_player = TablePlayer.find_by(player_id: player_id)

    dumped_actions = game_hand.dump_actions || {}
    data = {
      type: 'info',
      info_type: 'player_action',
      player_action_type: type,
      time: format_time(time),
      table_id: game_hand.table_id,
      player_id: player_id,
      nickname: table_player.player.nickname,
      image_url: table_player.player.image_url,
      amount: amount,
      pot: dumped_actions.sum { |_, action| action['total_bet_amount'] },
      round: round,
    }

    ActionCable.server.broadcast stream_name(game_hand.table_id), data
  end

  def self.stream_name(table_id)
    "information_channel_#{table_id}"
  end

  def self.format_time(time)
    time.strftime('%H:%M:%S')
  end
end
