class GameHandPlayer < ApplicationRecord
  belongs_to :game_hand

  # TODO: アクション毎にstackにUPDATE打った方が良いかな
  delegate :seat_no, :stack, to: :table_player

  def bet_amount_by_state(state)
    actions
      .filter { |action| action.state == state && action.action_type.in?(%w(blind call bet)) }
      .sum(&:amount)
  end

  def last_action
    actions.last
  end

  def last_action_by_state(state)
    actions.filter { |action| action.state == state }.last
  end

  def player_state
    allin? ? 'allin' : folded? ? 'folded' : 'active'
  end

  def allin?
    stack == 0
  end

  def folded?
    actions.any?(&:fold?)
  end

  def active?
    !folded? && !allin?
  end

  def show_hand?
    actions.any?(&:show?)
  end

  def muck_hand?
    actions.any?(&:muck?)
  end

  def taken_amount
    actions.filter(&:taken?).sum(&:amount)
  end

  def total_bet_amount
    actions.filter { |action| action.action_type.in?(%w(blind call bet)) }.sum(&:amount)
  end

  # 他プレイヤーに持っていかれた分を除いた総ベット額
  def effective_total_bet_amount
    total_bet_amount + actions.filter { |action| action.taken? && action.amount < 0 }.sum(&:amount)
  end

  def add_stack!(amount)
    table_player.stack += amount
    table_player.save!
  end

  private

  def actions
    game_hand.game_actions.filter { |action| action.player_id == self.player_id }.sort_by(&:order_id)
  end

  def table_player
    game_hand.table.table_players.find { |tp| tp.player_id == self.player_id }
  end
end
