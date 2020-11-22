class AddNpcPlayerCommand
  include Command

  attr_reader :table, :current_player, :seat_no, :npc_type

  validate :validate_table

  def initialize(table_id:, current_player_id:, seat_no:, npc_type:)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
    @seat_no = seat_no
    @npc_type = npc_type
  end

  def run
    table.with_lock do
      raise ActiveRecord::Rollback if invalid?
      table_player = table.add_npc_player(npc_type, seat_no)

      UploadProfileImageJob.perform_later(player: table_player.player, profile_image_url: choice_profile_image_url)
    end

    if success?
      GameManager.broadcast_all(table.id)
    end
  end

  private

  def choice_profile_image_url
    Rails.root.join('app', 'assets', 'images', 'default_profile_images', image_file_name).to_s
  end

  def image_file_name
    NpcPlayer.profile_by_npc_type[npc_type][:profile_image_name]
  end

  def validate_table
    errors.add(:table, :invalid) if TablePlayer.where(table_id: table.id, seat_no: seat_no).exists?
  end
end
