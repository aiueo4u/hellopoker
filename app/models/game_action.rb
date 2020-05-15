class GameAction < ApplicationRecord
  include ActionType

  ACTION_TIMEOUT = Rails.env.development? ? 20.seconds : 60.seconds

  belongs_to :game_hand
  belongs_to :player

  # TODO: hand_open
  # TODO: result -> payment
  enum state: %i(
    preflop
    flop
    turn
    river
    result
  )

  def self.timeout_from_last_action?(last_action, time: Time.current)
    last_action.created_at.since(ACTION_TIMEOUT) <= time
  end
end
