# frozen_string_literal: true

module Users
  module UserBookmarks
    class CreateService < ::Users::UserBookmarks::BaseService
      def action
        unbookmark if user_bookmark.persisted?
        user_bookmark.save! unless user_bookmark.persisted?
      end

      def user_bookmark
        @user_bookmark ||= UserBookmark.find_or_initialize_by(
          resource_id: user_bookmark_params['resource_id'],
          resource_type: user_bookmark_params['resource_type'],
          user_id: @current_user_id
        )
      end

      def unbookmark
        user_bookmark.destroy!
      end
    end
  end
end
