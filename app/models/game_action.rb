class GameAction < ApplicationRecord
  include ActionType

  ACTION_TIMEOUT = Rails.env.development? ? 20.minutes : 20.seconds

  belongs_to :game_hand
  belongs_to :player

  enum state: %i(
    init
    preflop
    flop
    turn
    river
    result
    finished
  )

  def self.timeout_from_last_action?(last_action, time: Time.current)
    last_action.created_at.since(ACTION_TIMEOUT) <= time
  end
end
