FactoryBot.define do
  factory :table_player do
    table
    player

    stack { 10000 }
  end
end
