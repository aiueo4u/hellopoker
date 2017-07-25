require 'rails_helper'

describe GameUtils do
  describe '.sort_seat_nos' do
    context 'まだ誰もアクションしていない場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3, 4], nil) }

      it '小さい順に並ぶ' do
        is_expected.to eq [1, 2, 3, 4]
      end
    end

    context '1番がアクションした場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3, 4], 1) }

      it '2番から並ぶ' do
        is_expected.to eq [2, 3, 4, 1]
      end
    end

    context '2番がアクションした場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3, 4], 2) }

      it '3番から並ぶ' do
        is_expected.to eq [3, 4, 1, 2]
      end
    end

    context '3番がアクションした場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3, 4], 3) }

      it '4番から並ぶ' do
        is_expected.to eq [4, 1, 2, 3]
      end
    end

    context '4番がアクションした場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3, 4], 4) }

      it '1番から並ぶ' do
        is_expected.to eq [1, 2, 3, 4]
      end
    end

    context '1番がアクションしたが、候補に含まれていない場合' do
      subject { GameUtils.sort_seat_nos([2, 3, 4], 1) }

      it '2番から並ぶ' do
        is_expected.to eq [2, 3, 4]
      end
    end

    context '4番がアクションしたが、候補に含まれていない場合' do
      subject { GameUtils.sort_seat_nos([1, 2, 3], 4) }

      it '1番から並ぶ' do
        is_expected.to eq [1, 2, 3]
      end
    end
  end
end
