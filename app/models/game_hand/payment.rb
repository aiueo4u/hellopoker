class GameHand::Payment
  attr_reader :game_hand

  def self.run(**args)
    new(**args).tap { |payment| payment.run }
  end

  def run
    winning_player_ids = calc_winning_player_ids
    min_total_bet_amount_in_not_folded_players = calc_min_total_bet_amount_in_not_folded_players

    game_hand.game_hand_players.each do |ghp|
      next unless ghp.effective_total_bet_amount > 0
      amount = [min_total_bet_amount_in_not_folded_players, ghp.effective_total_bet_amount].min

      # 取得版
      chopped_amount = (amount / winning_player_ids.size).to_i # TOOD: 割り切れないときの誤差調整
      winning_player_ids.each do |winning_player_id|
        game_hand.build_taken_action(winning_player_id, chopped_amount)
        game_hand.add_player_stack!(winning_player_id, chopped_amount)
      end

      # 奪われた版
      game_hand.build_taken_action(ghp.player_id, -1 * amount)
    end

    game_hand.save!
  end

  def initialize(game_hand:)
    @game_hand = game_hand
  end

  private

  def calc_winning_player_ids
    GameHand::Evaluator.calc_winning_player_ids(game_hand.board_cards, unsettled_bet_amount_player_cards_by_player_id)
  end

  def unsettled_bet_amount_player_cards_by_player_id
    game_hand.game_hand_players
      .filter(&:unsettled_bet_amount?)
      .map { |ghp| [ghp.player_id, [Poker::Card.new(ghp.card1_id), Poker::Card.new(ghp.card2_id)]] }
      .to_h
  end

  def calc_min_total_bet_amount_in_not_folded_players
    game_hand.game_hand_players
      .reject(&:folded?) # TODO: mucked?
      .map(&:effective_total_bet_amount)
      .filter { |amount| amount > 0 }
      .min
  end
end
