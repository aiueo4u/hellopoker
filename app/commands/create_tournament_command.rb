class CreateTournamentCommand
  include Command

  attr_reader :name, :tournament

  validate :validate_tournament

  def initialize(name:)
    @name = name
  end

  def run
    @tournament = Tournament.new(name: name)
    @tournament.tables.build(name: name)
    @tournament.save!
  end

  private

  def validate_tournament
  end
end
