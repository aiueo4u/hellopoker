json.tournaments @tournaments do |tournament|
  json.partial! 'tournament', tournament: tournament
end
