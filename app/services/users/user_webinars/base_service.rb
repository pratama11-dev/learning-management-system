# frozen_string_literal: true

module Users
  module UserWebinars
    class BaseService < ::BaseService
      def initialize(params, current_user_id)
        @params = params
        @current_user_id = current_user_id
      end

      protected

      def user_webinar_params
        @user_webinar_params ||= @params
                                 .require(:user_webinar)
                                 .permit(
                                   :webinar_id,
                                   :user_id
                                 )
      end
    end
  end
end
