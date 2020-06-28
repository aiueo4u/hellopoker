class Tournament < ApplicationRecord
  has_many :tables

  BLIND_STRUCTURES = [
    { level: 1, sb: 25, bb: 50, ante: 0, time: 1.minutes },
    { level: 2, sb: 50, bb: 100, ante: 100, time: 1.minutes },
    { level: 3, sb: 100, bb: 200, ante: 200, time: 1.minutes },
  ]

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
end
