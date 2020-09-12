FactoryBot.define do
  factory :player do
    sequence(:nickname) { |n| "nickname#{n}" }
  end
end
