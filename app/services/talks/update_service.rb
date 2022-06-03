# frozen_string_literal: true

module Talks
  class UpdateService < ::Talks::BaseService
    def action
      talk.assign_attributes(talk_params.except('video_id'))
      talk.save!
      synchronize_new_video if talk_params['video_id'] != talk.video.id
    end

    def talk
      @talk ||= Talk.find_by(id: @params[:id])
    end

    def synchronize_new_video
      talk.video.destroy
      new_video = Video.find_by(id: talk_params['video_id'])
      assigned_video = new_video.dup
      assigned_video.file.attach(new_video.file.blob)
      assigned_video.resource_id = talk.id
      assigned_video.resource_class = 'Talk'
      assigned_video.save!
    end
  end
end
