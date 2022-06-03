# frozen_string_literal: true

module Webinars
  class BaseService < ::BaseService
    def initialize(params)
      @params = params
    end

    protected

    def webinar_params
      @webinar_params ||= @params
                          .require(:webinar)
                          .permit(
                            :title,
                            :description,
                            :url,
                            :speaker,
                            :capacity,
                            :duration,
                            :is_active,
                            :theme,
                            :date,
                            :tag,
                            :certificate_claim_duration,
                            :banner_image,
                            :speaker_avatar
                          )
    end
  end
end
