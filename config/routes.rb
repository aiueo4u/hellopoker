Rails.application.routes.draw do
  root 'home#index'

  get '/', to: 'home#index'
  get '/login', to: 'home#index'
  resources :tables, to: 'home#index'
  resources :tournaments, only: %i(index show),  to: 'home#index'
  get '/settings', to: 'home#index'

  namespace :api do
    resources :tests, only: %i(create)
    resource :session, only: %i(create destroy)
    resources :players, only: %i(show update)
    resources :tables do
      resources :table_messages, only: %i(index create)
    end

    resources :tournaments, only: %i(index show create) do
      post :start, on: :member
      post :entry, on: :member
    end

    resource :game_dealer, only: %i(create) do
      post :start, on: :collection
      post :take_seat, on: :collection
      post :add_npc_player, on: :collection
      post :retry_npc_player_action, on: :collection
    end
  end

  namespace :admin do
    get '/', to: 'home#index'
    resources :client_versions, only: %i(create)
    resources :game_hands
    resources :tables
    resources :tournaments do
      post :debug_entry, on: :member
    end
  end

  get 'auth/facebook/callback', to: 'players/omniauth_callbacks#facebook'
  get 'auth/twitter/callback', to: 'players/omniauth_callbacks#twitter'
end
