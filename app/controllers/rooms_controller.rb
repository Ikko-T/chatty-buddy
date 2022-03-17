class RoomsController < ApplicationController
  def show
    @messages = Message.includes(:user).order(:id)
    @message = current_user.messages.build
  end

  def load_up
    last_id = params[:olodest_message_id].to_i - 1
    @messages = Message.include(:user).order(:id).where(id: 1..last_id).last(50)
  end
end
