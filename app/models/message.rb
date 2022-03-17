class Message < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 500 }

  # scope :load_old_messages, ->(number) { Message.includes(:user).order(:id).where(id: 1..last_id).last(50) }

  def template
    ApplicationController.render_with_signed_in_user(user, partial: 'messages/message', locals: { message: self })
  end
end
