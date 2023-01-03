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
end
