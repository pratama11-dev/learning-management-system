# frozen_string_literal: true

class VideoProcessingWorker
  include Sidekiq::Worker

  def perform(url_video, resource_id, resource_class, callback_url)
    return true if Rails.env.development?

    videos_service = WgVideos::BaseService.new
    response_body = videos_service.create({
                                            url_video: url_video,
                                            video_id: resource_id,
                                            callback_url: callback_url
                                          })

    resource = eval(resource_class).find_by(id: resource_id)
    if resource.present? && response_body[:video].present?
      resource.source_video_id = response_body[:video][:id]
      resource.save!
    end
  end
end
