# frozen_string_literal: true

module Users
  module UserBookmarks
    class BaseService < ::BaseService
      def initialize(params, current_user_id)
        @params = params
        @current_user_id = current_user_id
      end

      protected

      def user_bookmark_params
        @user_bookmark_params ||= @params
                                  .require(:user_bookmarks)
                                  .permit(
                                    :resource_id,
                                    :resource_type,
                                    :user_id
                                  )
      end
    end
  end
end
