module MessageHelper
  def my_message?(message)
    message.user == current_user ? "yes" : "no"
  end
end
