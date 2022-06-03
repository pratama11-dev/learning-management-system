# frozen_string_literal: true

module Users
  module UserCertificates
    class CreateService < ::Users::UserCertificates::BaseService
      def action
        user_certificate.save! if user_certificate.new_record?
      end

      def user_certificate
        @user_certificate ||= UserCertificate.find_or_initialize_by(
          resource_id: user_certificate_params['resource_id'],
          resource_type: user_certificate_params['resource_type'],
          base_resource_type: user_certificate_params['base_resource_type'],
          base_resource_id: user_certificate_params['base_resource_id'],
          user_id: @current_user_id
        )
      end

      def unbookmark
        user_certificate.destroy!
      end
    end
  end
end
