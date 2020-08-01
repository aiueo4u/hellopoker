class TablePlayer < ApplicationRecord
  belongs_to :table
  belongs_to :player

  def can_play_next_game?
    stack > 0 && timeout_count == 0
  end
end
