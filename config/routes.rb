Rails.application.routes.draw do
  root 'home#index'

  get '/', to: 'home#index'
  get '/login', to: 'home#index'
  resources :tables, to: 'home#index'
  get '/settings', to: 'home#index'

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

  namespace :admin do
    get '/', to: 'home#index'
    resources :client_versions, only: %i(create)
    resources :game_hands
    resources :tables
  end

  get 'auth/:provider/callback', to: 'sessions#callback'
end
