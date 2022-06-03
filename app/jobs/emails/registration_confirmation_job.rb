# frozen_string_literal: true

module Emails
  class RegistrationConfirmationJob < ApplicationJob
    queue_as :default

    def perform(user_id)
      @user = User.find_by(id: user_id)
      service.run
    end

    private

    def service
      @service = Emails::RegistrationConfirmationService.new(
        @user
      )
    end
  end
end
