Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  devise_scope :user do
    post "users/guest_sign_in", to: "users/sessions#guest_sign_in"
  end
  root 'rooms#show'
  resources :messages, only: :create
  # get '/load_up', to: 'rooms#load_up'
end
