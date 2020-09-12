class GameAction < ApplicationRecord
  include ActionType

  ACTION_TIMEOUT = Rails.env.development? ? 30.seconds : 60.seconds

  belongs_to :game_hand
  belongs_to :player

  enum state: %i(
    preflop
    flop
    turn
    river
    hand_open
    payment
  )

  def self.timeout_from_last_action?(last_action, time: Time.current)
    last_action.created_at.since(ACTION_TIMEOUT) <= time
  end

  def self.build_bet_action(player_id, state, order_id, amount)
    new(player_id: player_id, state: state, order_id: order_id, action_type: :bet, amount: amount)
  end

  def self.build_blind_action(player_id, order_id, amount)
    new(player_id: player_id, state: :preflop, order_id: order_id, action_type: :blind, amount: amount)
  end

  def self.build_call_action(player_id, state, order_id, amount)
    new(player_id: player_id, state: state, order_id: order_id, action_type: :call, amount: amount)
  end

  def self.build_check_action(player_id, state, order_id)
    new(player_id: player_id, state: state, order_id: order_id, action_type: :check)
  end

  def self.build_fold_action(player_id, state, order_id)
    new(player_id: player_id, state: state, order_id: order_id, action_type: :fold)
  end

  def self.build_muck_action(player_id, order_id)
    new(player_id: player_id, state: :hand_open, order_id: order_id, action_type: :muck)
  end

  def self.build_show_action(player_id, order_id)
    new(player_id: player_id, state: :hand_open, order_id: order_id, action_type: :show)
  end

  def self.build_taken_action(player_id, order_id, amount)
    new(player_id: player_id, state: :payment, order_id: order_id, action_type: :taken, amount: amount)
  end
end
