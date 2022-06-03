# frozen_string_literal: true

module WgVideosConfig
  class << self
    def authorization
      return @authorization if @authorization.present?

      @authorization = "Basic #{ENV['WG_VIDEOS_API_KEY']}"
    end

    def base_url
      return @base_url if @base_url.present?

      @base_url = ENV['WG_VIDEOS_URL']
    end
  end
end
