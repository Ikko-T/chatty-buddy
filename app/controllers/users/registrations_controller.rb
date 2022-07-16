class Users::RegistrationsController < Devise::RegistrationsController
  before_action :ensure_guest_user, only: :destroy

  def ensure_guest_user
    if resource.email == "guest@example.com"
      redirect_to root_path, alert: "A guest user can't be deleted."
    end
  end
end
