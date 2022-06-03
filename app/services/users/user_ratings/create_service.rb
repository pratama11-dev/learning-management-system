# frozen_string_literal: true

module Users
  module UserRatings
    class CreateService < ::Users::UserRatings::BaseService
      include Rails.application.routes.url_helpers

      def action
        user_rating.rating = @user_ratings_params[:rating]
        user_rating.comment = @user_ratings_params[:comment]
        if user_rating.new_record?
          create_notification
        end

        user_rating.save!
      end

      def user_rating
        @user_rating ||= UserRating.find_or_initialize_by(
          user_id: @current_user_id,
          resource_id: @user_ratings_params[:resource_id],
          resource_type: @user_ratings_params[:resource_type]
        )
      end

      def create_notification
        set_host
        new_notification = Notification.new(
          user_id: @current_user_id,
          title: "Berhasil Menyelesaikan video dan memberikan rating",
          content: "Anda telah berhasil Menyelesaikan #{title_source} dan memberikan rating",
          url: root_url
        )
        new_notification.save!
        new_notification.reload.send_email
      end

      def set_host
        default_url_options[:host] = ENV["HOST"]
      end

      def title_source
        @user_rating&.source&.name || @user_rating&.source&.title || 'Belajar Pajak'
      end
    end
  end
end
