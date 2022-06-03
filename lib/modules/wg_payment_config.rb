# frozen_string_literal: true

module WgPaymentConfig
  CREATE_RECURRING_PAYMENT_PATH = '/api/v1/recurring_payments'

  class << self
    def authorization
      return @authorization if @authorization.present?

      @authorization = "Basic #{auth_token}"
    end

    def base_url
      return @base_url if @base_url.present?

      @base_url = xendit_config.base_url
    end

    private

    def auth_token
      return @auth_token if @auth_token.present?

      @auth_token = Base64.strict_encode64 "#{api_key}:"
    end

    def api_key
      return @api_key if @api_key.present?

      @api_key = xendit_config.api_key
    end

    def xendit_config
      @xendit_config ||= OpenStruct.new(YAML.safe_load(ERB.new(
        File.read('config/wg_payment_config.yml')
      ).result)[Rails.env])
    end
  end
end
