FactoryBot.define do
  factory :table do
    sequence(:name) { |n| "table#{n}" }
    sb_size { 50 }
    bb_size { 100 }
  end
end
