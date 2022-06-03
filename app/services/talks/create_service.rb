# frozen_string_literal: true

module Talks
  class CreateService < ::Talks::BaseService
    def action
      talk.order_number = Talk.count + 1
      talk.save!
      if talk_params['video_id'].present?
        new_video = video.dup
        new_video.file.attach(video.file.blob)
        new_video.resource_id = talk.id
        new_video.resource_class = 'Talk'
        new_video.save!
      end
    end

    def talk
      @talk ||= Talk.new(talk_params.except('video_id'))
    end

    def video
      @video ||= Video.find_by(id: talk_params['video_id'])
    end
  end
end
