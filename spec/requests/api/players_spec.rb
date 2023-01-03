require 'rails_helper'

RSpec.describe '/api/players', type: :request do
  describe 'GET /api/players/@me' do
    describe 'about 200' do
      let(:current_player) { create(:player) }
      let(:rspec_session) do
        {
          jwt: AuthToken.encode({ id: current_player.id }),
        }
      end

      it 'returns 200' do
        get "/api/players/@me"
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'about 4XX' do
      context 'when unauthenticated' do
        it 'returns 401' do
          get '/api/players/@me'
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
  end

  describe 'PUT /api/players/@me' do
    describe 'about 200' do
      let(:current_player) { create(:player) }
      let(:rspec_session) do
        {
          jwt: AuthToken.encode({ id: current_player.id }),
        }
      end

      before do
        use_case = instance_double(Player::UploadProfileImageUseCase, success?: true, player: current_player)
        allow(Player::UploadProfileImageUseCase).to receive(:perform).and_return(use_case)
      end

      it 'returns 200' do
        put '/api/players/@me', params: { player: { profile_image: fixture_file_upload('spec/fixtures/images/1x1.png', 'image/png', true) } }
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'about 4XX' do
      context 'when unauthenticated' do
        it 'returns 401' do
          put '/api/players/@me'
          expect(response).to have_http_status(:unauthorized)
        end
      end

      context 'when a use case fails' do
        let(:current_player) { create(:player) }
        let(:rspec_session) do
          {
            jwt: AuthToken.encode({ id: current_player.id }),
          }
        end

        before do
          use_case = instance_double(Player::UploadProfileImageUseCase, success?: false)
          allow(Player::UploadProfileImageUseCase).to receive(:perform).and_return(use_case)
        end

        it 'returns 400' do
          put '/api/players/@me', params: { player: { profile_image: fixture_file_upload('spec/fixtures/images/1x1.png', 'image/png', true) } }
          expect(response).to have_http_status(:bad_request)
        end
      end
    end
  end
end
