# frozen_string_literal: true

module Users
  module UserRatings
    class BaseService < ::BaseService
      def initialize(params, current_user_id)
        @user_ratings_params = params[:user_rating]
        @current_user_id = current_user_id
      end
    end
  end
end
