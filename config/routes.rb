Rails.application.routes.draw do
  namespace :api do
    resource :session, only: %i(create)
    resources :players
    resources :tables

    resources :tables, only: %i(), module: :tables  do
      resources :players
    end
    resource :game_dealer, only: %i(create)
  end

  get 'auth/:provider/callback', to: 'sessions#callback'
end
