# frozen_string_literal: true

module Emails
  class ForgetPasswordService < ::Emails::BaseService
    include Rails.application.routes.url_helpers

    def initialize(user)
      @user = user
    end

    def subject
      'Forget Password Account LMS Taxsam'
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
      set_url

      ApplicationController.render(
        template: 'mailer/change_password',
        layout: false,
        assigns: {
          user: @user,
          forget_uri: forget_uri
        }
      )
    end

    def forget_uri
      @forget_uri = edit_authentications_password_url(id: @user.id, token: @user.confirmation_token).to_s
    end

    def set_url
      default_url_options[:host] = ENV['HOST']
    end
  end
end
