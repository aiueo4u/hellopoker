class GameHand < ApplicationRecord
  has_many :game_hand_players
  has_many :game_hand_pots

  enum state: %i(
    init
    preflop
    flop
    turn
    river
    result
    finished
  )

  def next_state
    finished? ? nil : self.class.states[state] + 1
  end
end
