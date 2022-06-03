# frozen_string_literal: true

module Authentications
  class SessionsController < Clearance::SessionsController
    include Clearance::Controller
    layout 'session'

    def create
      @user = authenticate(params)

      sign_in(@user) do |status|
        if status.success?
          redirect_back_or url_after_create
        else
          redirect_to root_path(login: true), alert: status.failure_message
        end
      end
    end

    def url_after_destroy
      root_path
    end

    def url_after_create
      return admin_dashboard_path if current_user.is_admin?

      root_path
    end
  end
end
