require 'rails_helper'

describe Poker::Card do
  describe '.new' do
    context 'with invalid args' do
      it do
        expect { Poker::Card.new('13') }.to raise_error(ArgumentError, /\Ainvalid id/)
      end
    end

    context 'with valid args' do
      %w(A 2 3 4 5 6 7 8 9 T J Q K).each do |rank|
        %w(s h c d).each do |suit|
          it do
            card = Poker::Card.new("#{rank}#{suit}")
            expect(card.id).to eq "#{rank}#{suit}"
            expect(card.rank).to eq rank
            expect(card.suit).to eq suit

            case rank
            when 'A'
              strength = 14
            when 'K'
              strength = 13
            when 'Q'
              strength = 12
            when 'J'
              strength = 11
            when 'T'
              strength = 10
            else
              strength = rank.to_i
            end

            expect(card.strength).to eq strength
          end
        end
      end
    end
  end
end
