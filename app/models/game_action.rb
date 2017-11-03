class GameAction < ApplicationRecord
  include ActionType

  belongs_to :game_hand

  enum state: %i(
    init
    preflop
    flop
    turn
    river
    result
    finished
  )
end
