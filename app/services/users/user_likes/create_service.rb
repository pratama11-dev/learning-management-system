# frozen_string_literal: true

module Users
  module UserLikes
    class CreateService < ::Users::UserLikes::BaseService
      def action
        user_like.likes = user_likes_params['likes'] == 'true'
        user_like.save!
      end

      def user_like
        @user_like ||= UserLike.find_or_initialize_by(
          resource_id: user_likes_params['resource_id'],
          resource_type: user_likes_params['resource_type'],
          user_id: @current_user_id
        )
      end
    end
  end
end
