class CreateGameHandCommand
  include Command

  attr_reader :table, :current_player, :manager, :game_hand

  validate :validate_table

  def initialize(table_id:, current_player_id:)
    @table = Table.find(table_id)
    @current_player = Player.find(current_player_id)
  end

  def run
    table.with_lock do
      raise ActiveRecord::Rollback if invalid?

      exclude_non_active_players

      @game_hand = create_new_game

      @manager = GameManager.new(table.id, just_created: true)
    end

    if success?
      @manager.broadcast_all

      # 最初のプレイヤーのターン開始
      table_player = @manager.game_hand.current_seat_table_player
      if table_player.auto_play?
        NpcPlayerJob.perform_later(table.id, table_player.player_id)
      end
      TimeKeeperJob.perform_later(table.id, table_player.player_id, @manager.game_hand.last_action.order_id)
    end
  end

  private

  def create_new_game
    game_hand = GameHand.new(
      table: table,
      sb_size: table.current_sb_size,
      bb_size: table.current_bb_size,
      ante_size: table.current_ante_size,
    )

    deck = Poker::Deck.new

    # スタックがあるプレイヤーのみ参加
    #   - カードも配る
    joining_table_players = table.table_players.filter(&:can_play_next_game?).sort_by(&:seat_no)
    joining_table_players.each do |table_player|
      game_hand.game_hand_players.build(
        player_id: table_player.player_id,
        initial_stack: table_player.stack,
        card1_id: deck.draw.id,
        card2_id: deck.draw.id,
      )
    end

    # ボードのカードを決めちゃう
    game_hand.board_card1_id = deck.draw.id
    game_hand.board_card2_id = deck.draw.id
    game_hand.board_card3_id = deck.draw.id
    game_hand.board_card4_id = deck.draw.id
    game_hand.board_card5_id = deck.draw.id

    # ボタンポジションの決定
    last_button_seat_no = GameHand.where(table: table).order(:id).last&.button_seat_no || joining_table_players[-1].seat_no

    # btn, sb, bb, ...
    sorted_seat_nos = GameUtils.sort_seat_nos(joining_table_players.map(&:seat_no), last_button_seat_no)
    game_hand.button_seat_no = sorted_seat_nos[0]

    # SB,BBのシート番号
    if sorted_seat_nos.size == 2 # Heads up
      sb_seat_no = sorted_seat_nos[0]
      bb_seat_no = sorted_seat_nos[1]
    else
      sb_seat_no = sorted_seat_nos[1]
      bb_seat_no = sorted_seat_nos[2]
    end

    # SB,BBからブラインド徴収
    sb_table_player = joining_table_players.find { |tp| tp.seat_no == sb_seat_no }
    sb_amount = [game_hand.sb_size, sb_table_player.stack].min
    sb_table_player.stack -= sb_amount
    game_hand.build_blind_action(sb_table_player.player_id, sb_amount)

    bb_table_player = joining_table_players.find { |tp| tp.seat_no == bb_seat_no }
    bb_amount = [game_hand.bb_size, bb_table_player.stack].min
    bb_table_player.stack -= bb_amount
    game_hand.build_blind_action(bb_table_player.player_id, bb_amount)

    sb_table_player.save!
    bb_table_player.save!
    game_hand.save!
    game_hand
  end

  def validate_table
    manager = GameManager.new(table.id)

    if table.table_players.count(&:can_play_next_game?) < 2
      errors.add(:table, :invalid)
      return
    end

    # 前回のゲームが終了状態になっているかチェック
    errors.add(:table, :invalid) if manager.game_hand && manager.current_state != 'finished'
  end

  def exclude_non_active_players
    # スタックが無いプレイヤーはゲーム開始時に除外しておく
    # タイムアウトを重ねたプレイヤーも除外
    table.table_players.each do |table_player|
      if !table_player.can_play_next_game?
        table_player.destroy!
      end
    end
  end
end
