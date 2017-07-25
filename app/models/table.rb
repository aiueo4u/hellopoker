class Table < ApplicationRecord
  has_many :table_players

  validates :name, presence: true
  validates :sb_size, numericality: { greater_than: 0 }
  validates :bb_size, numericality: { greater_than: 0 }
  validate :validate_blind_size

  private

  def validate_blind_size
    errors.add(:bb_size, 'がSBサイズよりも小さいです。') if sb_size > bb_size
  end
end
