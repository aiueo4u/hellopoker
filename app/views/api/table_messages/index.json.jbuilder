json.table_messages @table_messages do |table_message|
  json.id table_message.id
  json.content table_message.content
  json.created_at table_message.created_at.to_i

  json.player do
    json.id table_message.player.id
    json.name table_message.player.name
    json.profile_image_url table_message.player.profile_image_url
  end
end
