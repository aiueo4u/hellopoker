json.tables @tables.map do |table|
  json.id table.id
  json.name table.name
  json.players table.players.map do |player|
    json.id player.id
    json.nickname player.nickname
  end
end
