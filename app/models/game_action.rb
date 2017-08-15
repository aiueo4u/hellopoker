class GameAction < ApplicationRecord
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

  enum action_types: %i(
    blind
    check
    bet
    call
    fold
    taken
  )
end
