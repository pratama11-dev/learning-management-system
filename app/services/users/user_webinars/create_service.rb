# frozen_string_literal: true

module Users
  module UserWebinars
    class CreateService < ::Users::UserWebinars::BaseService
      include Rails.application.routes.url_helpers

      def action
        return if user_webinar.persisted?

        unless user_webinar.persisted?
          user_webinar.save! 
          create_notification
        end
      end

      def user_webinar
        @user_webinar ||= UserWebinar.find_or_initialize_by(
          user_id: @current_user_id,
          webinar_id: user_webinar_params['webinar_id']
        )
      end

      def create_notification
        set_host
        new_notification = Notification.new(
          user_id: @current_user_id,
          title: "Berhasil mendaftar #{@user_webinar.webinar.title}",
          content: "Anda telah berhasil mendaftar live online classes untuk #{@user_webinar.webinar.title} pada tanggal #{@user_webinar.webinar.date.localtime.strftime('%d %B %Y - %H:%M')}",
          url: webinar_url(slug: @user_webinar.webinar.slug)
        )
        new_notification.save!
        new_notification.send_email
      end

      def set_host
        default_url_options[:host] = ENV["HOST"]
      end
    end
  end
end
