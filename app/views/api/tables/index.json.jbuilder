json.tables @tables.map do |table|
  json.id table.id
  json.name table.name
  json.players table.table_players.map do |table_player|
    json.id @player_by_id[table_player.player_id].id
    json.nickname @player_by_id[table_player.player_id].nickname
  end
end
