class RoomsController < ApplicationController
  def show
    @messages = Message.includes(:user).order(:id)
    @message = current_user.messages.build
  end

  # def load_up
  #   last_id = params[:oldest_message_id].to_i - 1
  #   @messages = load_olod_messages(50)
  # end
end
