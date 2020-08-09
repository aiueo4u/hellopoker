class Tournament::EntryCommand
  include Command

  attr_reader :tournament, :current_player, :table

  validate :validate_current_player
  validate :validate_tournament

  def initialize(tournament_id:, current_player:)
    @tournament = Tournament.find(tournament_id)
    @current_player = current_player
  end

  def run
    tournament.with_lock do
      raise_rollback if invalid?

      @table = choice_table
      @table.add_player_at_any_seat(current_player, Tournament::INITIAL_STACK)

      if success?
        GameManager.broadcast_all(@table.id)
      end
    end
  end

  private

  # 1-6: 1 table(6)
  # 7: 2 tables(4, 3)
  # 8: 2 tables(4, 4)
  # 9: 2 tables(5, 4)
  # 10: 2 tables(5, 5)
  # 11: 2 tables(6, 5)
  # 12: 2 tables(6, 6)
  # 13: 3 tables(5, 4, 4)
  # 14: 3 tables(5, 5, 4)
  # ...
  #
  def choice_table
    prev_table_count = table_count(active_player_count)
    next_table_count = table_count(active_player_count + 1)

    if prev_table_count < next_table_count
      # TODO: テーブルブレイク（大変）
      new_table = tournament.tables.create!(name: tournament.name)
    else
      min_player_count_table
    end
  end

  def min_player_count_table
    tournament.tables.min_by { |table| table.table_players.size }
  end

  def table_count(player_count)
    ((player_count - 1) / max_player_count_in_table) + 1
  end

  def max_player_count_in_table
    6
  end

  # プレイ中のプレイヤー人数
  def active_player_count
    tournament.tables.flat_map(&:table_players).size
  end

  def validate_current_player
    # 既に参加中の場合はエラー
    tournament.tables.each do |table|
      if current_player.id.in?(table.table_players.map(&:player_id))
        errors.add(:current_player, :invalid)
      end
    end
  end

  def validate_tournament
    # エントリー可能期間チェック
    # TODO: 最大参加人数
    # TODO: レイトレジスト

    # TODO: テーブルブレイクが大変なので6人までに限定…!
    errors.add(:tournament, :invalid) if active_player_count >= 6
  end
end
