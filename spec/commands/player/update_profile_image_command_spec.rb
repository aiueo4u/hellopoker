require 'rails_helper'

RSpec.describe Player::UpdateProfileImageCommand do
  describe '.perform' do
    subject { described_class.run(player: player, profile_image: profile_image) }

    let(:player) { create(:player) }
    let(:profile_image) { fixture_file_upload('spec/fixtures/images/1x1.png', 'image/png', true) }

    it 'succeeds' do
      expect(subject.success?).to be true
    end

    it 'updates player\'s profile image' do
      expect { subject }
        .to change { player.profile_image_file_name }
        .from(nil)
        .to('1x1.png')
    end
  end
end
