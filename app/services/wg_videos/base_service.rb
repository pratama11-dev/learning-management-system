# frozen_string_literal: true

module WgVideos
  class BaseService < ::BaseService
    attr_reader :response

    def initialize; end

    def get
      @response = connection.get(path)

      return handle_success if @response.status == 200

      handle_error
    end

    def show(video_id)
      @response = connection.get("#{path}/#{video_id}")

      return handle_success if @response.status == 200

      handle_error
    end

    def create(params)
      @response = connection.post(path) do |req|
        req.body = params.to_json
      end

      return handle_success if @response.status == 200

      handle_error
    end

    protected

    def connection
      @faraday_connection ||= Faraday.new(options) do |faraday|
        faraday.adapter Faraday.default_adapter
      end
    end

    def handle_error
      fetch_error_messages
      Rails.logger.error "[ERROR][WG_VIDEO][BASE_SERVICE][HANDLE_ERROR] #{full_error_messages}"
    end

    def handle_success
      response_body
    end

    def response_body
      @response_body = eval(response.body.gsub(/null/, 'nil'))
    end

    private

    def options
      @options ||= {
        url: WgVideosConfig.base_url,
        headers: {
          'Authorization': WgVideosConfig.authorization,
          'Content-Type': 'application/json'
        }
      }
    end

    def path
      '/api/v1/videos'
    end

    def fetch_error_messages
      error_messages << "[ERROR][WG_VIDEO_SERVICE] Status: #{response.status}"
      error_messages << "[ERROR][WG_VIDEO_SERVICE] Body: #{response.body}"
    end
  end
end
