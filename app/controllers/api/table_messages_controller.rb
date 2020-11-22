class Api::TableMessagesController < Api::ApplicationController
  before_action :check_jwt

  def index
    table = Table.find(params[:table_id])
    @table_messages = table.table_messages
      .order(id: :desc)
      .includes(:player)
      .limit(30)
      .sort_by(&:id)
  end

  def create
    table = Table.find(params[:table_id])
    table_message = table.table_messages.create!(
      player_id: current_player.id,
      content: params[:content],
    )

    broadcast(table_message)
  end

  private

  def broadcast(table_message)
    data = {
      id: table_message.id,
      content: table_message.content,
      created_at: table_message.created_at.to_i,
      player: {
        id: table_message.player.id,
        name: table_message.player.name,
        profile_image_url: table_message.player.profile_image_url,
      }
    }
    ActionCable.server.broadcast "table_message_#{table_message.table_id}", data
  end
end
