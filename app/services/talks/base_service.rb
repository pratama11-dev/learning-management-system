# frozen_string_literal: true

module Talks
  class BaseService < ::BaseService
    def initialize(params)
      @params = params
    end

    protected

    def talk_params
      @talk_params ||= @params
                       .require(:talk)
                       .permit(
                         :video_id,
                         :name,
                         :description,
                         :banner_image
                       )
    end
  end
end
