class DealtCardChannel < ApplicationCable::Channel
  def subscribed
    table_id = params[:tableId]

    stream_from stream_name(table_id, current_player.id)

    manager = GameManager.new(table_id, nil, nil, nil, nil)
    if manager.game_hand
      game_hand_id = manager.game_hand.id
      game_hand_player = GameHandPlayer.find_by(game_hand_id: game_hand_id, player_id: current_player.id)
      table = Table.find(table_id)

      if game_hand_player && table.deal_cards
        data = {
          player_id: current_player.id,
          cards: [
            { rank: game_hand_player.card1_id[0], suit: game_hand_player.card1_id[1] },
            { rank: game_hand_player.card2_id[0], suit: game_hand_player.card2_id[1] },
          ]
        }
        ActionCable.server.broadcast stream_name(table_id, current_player.id), data
      end
    end
  end

  def unsubscribed
  end

  private

  def stream_name(table_id, player_id)
    "dealt_card_channel_#{table_id}_#{player_id}"
  end
end
