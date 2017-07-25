Rails.application.routes.draw do
  resource :session, only: %i(create)
  resources :players
  resources :tables

  resources :tables, only: %i(), module: :tables  do
    resources :players
  end

  resource :game_dealer, only: %i(create)
end
