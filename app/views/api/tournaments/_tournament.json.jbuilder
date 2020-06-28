json.id tournament.id
json.name tournament.name
json.is_started tournament.started?

json.tables tournament.tables do |table|
  json.id table.id
  json.name table.name
  json.sb_size table.current_sb_size
  json.bb_size table.current_bb_size

  json.players table.table_players.map do |table_player|
    player = table_player.player

    json.id player.id
    json.nickname player.nickname
    json.profile_image_url player.profile_image_url
    json.seat_no table_player.seat_no
  end
end
