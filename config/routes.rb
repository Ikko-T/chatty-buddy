Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'rooms#show'
  resources :messages, only: :create
  get '/load_up', to: 'rooms#load_up'
end
