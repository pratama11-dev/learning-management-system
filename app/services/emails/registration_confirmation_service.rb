# frozen_string_literal: true

module Emails
  class RegistrationConfirmationService < ::Emails::BaseService
    include Rails.application.routes.url_helpers

    def initialize(user)
      @user = user
    end

    def subject
      'Confirmation Account LMS Taxsam'
    end

    def to
      {
        email: @user.email.to_s,
        name: @user.name.to_s
      }
    end

    def from
      @from ||= {
        email: 'hello@taxsam.co',
        name: 'Tax Learning Center - TAXSAM.CO'
      }
    end

    def content
      ApplicationController.render(
        template: 'mailer/send_confirmation',
        layout: false,
        assigns: {
          registration_uri: registration_uri,
          user: @user
        }
      )
    end

    private

    def registration_uri
      "#{host}#{registrations_show_confirmations_path(confirmation_token: @user.confirmation_token)}"
    end
  end
end
