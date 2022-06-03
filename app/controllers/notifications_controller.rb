# frozen_string_literal: true

class NotificationsController < ApplicationController
  layout 'homes'
  before_action :require_login
  def index; end

  def create
    unread_notifications = current_user.notifications.where(is_read: false)
    if unread_notifications.present?
      unread_notifications.update_all(is_read: true)
    end

    return render json: { message: "success"}, status: :ok
  end
end
