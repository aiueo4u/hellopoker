Rails.application.routes.draw do
  namespace :api do
    resource :session, only: %i(create)
    resources :players
    resources :tables
    resource :game_dealer, only: %i(create) do
      post :start, on: :collection
      post :take_seat, on: :collection
    end
  end

  get '/', to: 'home#index'

  namespace :admin do
    get '/', to: 'home#index'
  end

  get 'auth/:provider/callback', to: 'sessions#callback'
end
