require 'rails_helper'

RSpec.describe Player::UploadProfileImageUseCase do
  describe '.perform' do
    subject { described_class.perform(player: player, profile_image: profile_image) }

    context 'when a command succeeds' do
      let(:player) { create(:player) }
      let(:profile_image) { fixture_file_upload('spec/fixtures/images/1x1.png', 'image/png', true) }

      before do
        command = instance_double(Player::UpdateProfileImageCommand, success?: true)
        allow(Player::UpdateProfileImageCommand).to receive(:run).and_return(command)
      end

      it 'succeeds' do
        expect(subject.success?).to be true
      end

      it 'calls a command' do
        subject
        expect(Player::UpdateProfileImageCommand)
          .to have_received(:run)
          .with(player: player, profile_image: profile_image)
      end
    end

    context 'when a command fails' do
      let(:player) { create(:player) }
      let(:profile_image) { fixture_file_upload('spec/fixtures/images/1x1.png', 'image/png', true) }

      before do
        command = instance_double(Player::UpdateProfileImageCommand, success?: false)
        allow(Player::UpdateProfileImageCommand)
          .to receive(:run)
          .and_return(command)
      end

      it 'fails' do
        expect(subject.success?).to be false
      end

      it 'calls a command' do
        subject
        expect(Player::UpdateProfileImageCommand)
          .to have_received(:run)
          .with(player: player, profile_image: profile_image)
      end
    end
  end
end
