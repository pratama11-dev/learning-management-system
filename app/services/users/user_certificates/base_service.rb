# frozen_string_literal: true

module Users
  module UserCertificates
    class BaseService < ::BaseService
      def initialize(params, current_user_id)
        @params = params
        @current_user_id = current_user_id
      end

      protected

      def user_certificate_params
        @user_certificate_params ||= @params
                                  .permit(
                                    :resource_id,
                                    :resource_type,
                                    :base_resource_type,
                                    :base_resource_id,
                                    :user_id
                                  )
      end
    end
  end
end
