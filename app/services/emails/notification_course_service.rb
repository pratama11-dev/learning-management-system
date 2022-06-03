# frozen_string_literal: true

module Emails
  class NotificationCourseService < ::Emails::BaseService
    include Rails.application.routes.url_helpers

    def initialize(notification: nil)
      set_url
      @notification = notification
      @user = notification.user
      @url = notification.url
    end

    def subject
      'Notification LMS Taxsam'
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
      view_template = 'mailer/send_notification'

      ApplicationController.render(
        template: view_template,
        layout: false,
        assigns: {
          url: @url,
          user: @user,
          notification: @notification
        }
      )
    end

    def set_url
      default_url_options[:host] = ENV['HOST']
    end
  end
end
