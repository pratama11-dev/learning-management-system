# frozen_string_literal: true

module Emails
  class BaseService < ::BaseService
    attr_reader :response

    def action
      @response = faraday.post(send_email_path) do |req|
        req.body = payload.to_json
      end
      return if @response.status == 200 && eval(@response.body)[:code] == 200

      Rails.logger.error "[ERROR][EMAILS][BASE_SERVICE][SEND] status: #{@response.status}"
      Rails.logger.error "[ERROR][EMAILS][BASE_SERVICE][SEND] body #{@response.body}"
      error_messages << "[ERROR][EMAILS][BASE_SERVICE][SEND] status: #{@response.status}"
      error_messages << "[ERROR][EMAILS][BASE_SERVICE][SEND] body: #{@response.body}"
      Rails.logger.debug error_messages
    end

    protected

    def faraday
      @faraday ||= Faraday.new(
        url: ENV['WG_EMAIL_BASE_URL'],
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => basic_auth
        }
      )
    end

    def payload
      {
        to: email_to,
        from: email_from,
        subject: email_subject,
        content: email_content
      }
    end

    def email_from
      "#{from[:name]} <#{from[:email]}>"
    end

    def email_to
      "#{email_to_name} <#{to[:email]}>"
    end

    def email_to_name
      @email_to_name ||= to[:name].to_s
                                  .gsub('.', ' ')
                                  .gsub(',', ' ')
                                  .gsub('  ', ' ')
                                  .gsub('   ', ' ')
    end

    def email_subject
      subject
    end

    def email_content
      content
    end

    def from
      @from ||= {
        email: 'hello@taxsam.co',
        name: 'Hello Taxsam.co'
      }
    end

    def host
      ENV['HOST']
    end

    private

    def basic_auth
      @basic_auth ||= "Basic #{encoded_api_key}"
    end

    def encoded_api_key
      Base64.strict_encode64("#{api_key}:")
    end

    def api_key
      ENV['WG_EMAIL_API_KEY']
    end

    def send_email_path
      'api/v1/mails'
    end
  end
end
