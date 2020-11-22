FactoryBot.define do
  factory :player do
    sequence(:name) { |n| "name#{n}" }
  end
end
