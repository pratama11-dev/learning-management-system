# frozen_string_literal: true

module Users
  module UserLikes
    class BaseService < ::BaseService
      def initialize(params, current_user_id)
        @params = params
        @current_user_id = current_user_id
      end

      protected

      def user_likes_params
        @user_likes_params ||= @params
                               .require(:user_likes)
                               .permit(
                                 :resource_type,
                                 :resource_id,
                                 :user_id,
                                 :likes
                               )
      end
    end
  end
end
