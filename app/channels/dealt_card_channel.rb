# 配布されたカード情報を配信
#   - ユーザー毎の専有チャンネル

class DealtCardChannel < ApplicationCable::Channel
  def subscribed
    table_id = params[:tableId]
    table = Table.find(table_id)

    stream_from stream_name(table.id, current_player.id)

    current_game_hand = GameManager.current_game_hand(table.id)
    return unless current_game_hand

    current_game_hand_player = current_game_hand.game_hand_player_by_id(current_player.id)
    return unless current_game_hand_player

    data = {
      player_id: current_game_hand_player.player_id,
      cards: [
        { rank: current_game_hand_player.card1_id[0], suit: current_game_hand_player.card1_id[1] },
        { rank: current_game_hand_player.card2_id[0], suit: current_game_hand_player.card2_id[1] },
      ]
    }
    ActionCable.server.broadcast stream_name(table.id, current_game_hand_player.player_id), data
  end

  def unsubscribed
  end

  private

  def stream_name(table_id, player_id)
    "dealt_card_channel_#{table_id}_#{player_id}"
  end
end
