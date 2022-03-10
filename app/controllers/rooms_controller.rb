class RoomsController < ApplicationController
  def show
    @messages = Message.includes(:user).order(:id)
    @message = current_user.messages.build
  end

  def show_additionally

  end
end
