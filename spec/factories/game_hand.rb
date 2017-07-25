FactoryGirl.define do
  factory :game_hand do

    trait :init do
      state  0
    end

    trait :preflop do
      state 1
    end

    trait :flop do
      state 2
    end

    trait :turn do
      state 3
    end

    trait :river do
      state 4
    end

    trait :result do
      state 5
    end

    trait :finished do
      state 6
    end
  end
end
