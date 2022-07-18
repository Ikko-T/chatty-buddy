class Users::PasswordsController < Devise::PasswordsController
  before_action :ensure_guest_user, only: :create

  def ensure_guest_user
    if params[:user][:email].downcase == "guest@example.com"
      redirect_to new_user_session_path, alert: "Guest user's password can't be reset"
    end
  end
end
