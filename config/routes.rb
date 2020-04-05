Rails.application.routes.draw do
  namespace :api do
    resources :tests, only: %i(create)
    resource :session, only: %i(create destroy)
    resources :players
    resources :tables
    resource :game_dealer, only: %i(create) do
      post :start, on: :collection
      post :take_seat, on: :collection
      post :add_npc_player, on: :collection
    end
  end

  get '/', to: 'home#index'

  namespace :admin do
    get '/', to: 'home#index'
    resources :client_versions, only: %i(create)
    resources :game_hands
    resources :tables
  end

  get 'auth/:provider/callback', to: 'sessions#callback'
end
