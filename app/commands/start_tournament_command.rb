class StartTournamentCommand
  include Command

  attr_reader :tournament, :current_player

  validate :validate_tournament

  def initialize(tournament_id:, current_player:)
    @tournament = Tournament.find(tournament_id)
    @current_player = current_player
  end

  def run
    tournament.with_lock do
      raise ActiveRecord::Rollback if invalid?
      tournament.start!

      # TODO: 複数対応
      # テーブル外の人が開始できるように修正
      tournament.tables.each do |table|
        CreateGameHandCommand.run(table_id: table.id, current_player_id: current_player.id)
      end
    end
  end

  private

  def validate_tournament
    # TODO
    # errors.add(:tournament, :invalid) if tournament.opened_at.present?
  end
end
