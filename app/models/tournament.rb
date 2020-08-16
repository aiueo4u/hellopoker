class Tournament < ApplicationRecord
  has_many :tables

  BLIND_STRUCTURES = [
    { level: 1, sb: 25, bb: 50, ante: 0, time: 1.minutes },
    { level: 2, sb: 50, bb: 100, ante: 100, time: 1.minutes },
    { level: 3, sb: 100, bb: 200, ante: 200, time: 1.minutes },
    { level: 4, sb: 200, bb: 400, ante: 200, time: 1.minutes },
    { level: 5, sb: 300, bb: 600, ante: 300, time: 1.minutes },
    { level: 6, sb: 400, bb: 800, ante: 400, time: 1.minutes },
    { level: 7, sb: 500, bb: 1000, ante: 500, time: 1.minutes },
  ]

  INITIAL_STACK = 10000

  def current_blind_structure(time = Time.current)
    if !opened_at
      return BLIND_STRUCTURES.first
    end

    passed_time = time - opened_at
    BLIND_STRUCTURES.each do |structure|
      passed_time -= structure[:time]
      if passed_time < 0
        return structure
      end
    end
    BLIND_STRUCTURES.last
  end

  def current_sb_size
    current_blind_structure[:sb]
  end

  def current_bb_size
    current_blind_structure[:bb]
  end

  def current_ante_size
    current_blind_structure[:ante]
  end

  def start!(time = Time.current)
    update!(opened_at: time)
  end

  def started?
    opened_at.present?
  end

  # TODO: レイト時間を過ぎている事を追加
  def finished?
    tables.map { |table| table.table_players.filter { |tp| tp.stack > 0 }.size }.sum == 1
  end
end
