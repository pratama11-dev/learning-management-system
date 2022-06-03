# frozen_string_literal: true

module Webinars
  module Helpers
    extend ActiveSupport::Concern

    def remaining_quota
      capacity&.to_i - user_webinars.count
    end

    def quota_reached?
      remaining_quota <= 0
    end

    def total_participants
      user_webinars.count
    end

    def attended_by(current_user_id)
      UserWebinar.find_by(
        user_id: current_user_id,
        webinar_id: id
      ).present?
    end

    def ticket_for(current_user_id)
      UserWebinar.find_by(
        user_id: current_user_id,
        webinar_id: id
      ).id
    end

    def is_live?
      range_time = (date..date.end_of_day)
      date_time_now = DateTime.now
      range_time === date_time_now
    end

    def is_done?
      done_time = (date + duration.minutes)
      done_time.end_of_day < DateTime.now
    end

    def streaming_platform_used
      return 'Zoom' if url.match(/https?:\S+zoom.us\S+/).present?
      return 'Google Meet' if url.match(/https?:\S+meet.google\S+/).present?
      return 'Youtube' if url.match(/https?:\S+youtube\S+/).present?
      return 'Microsoft Teams' if url.match(/https?:\S+microsoft\S+/).present?

      url.split('/')[2]
    end
  end
end
