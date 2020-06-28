class CreateTableCommand
  include Command

  attr_reader :table, :name, :sb_size, :bb_size

  validate :validate_table

  def initialize(name:, sb_size:, bb_size:)
    @name = name
    @sb_size = sb_size
    @bb_size = bb_size
  end

  def run
    @table = Table.create!(name: name, sb_size: sb_size, bb_size: bb_size)
  end

  private

  def validate_table
    errors.add(:table, :invalid) unless sb_size > 0
    errors.add(:table, :invalid) unless bb_size > 0
    errors.add(:table, :invalid) unless sb_size < bb_size
  end
end
