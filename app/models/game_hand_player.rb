class GameHandPlayer < ApplicationRecord
  belongs_to :game_hand

  enum state: %i(
    active
    folded
    allin
  )
end
