module UserWebinars
  module CheckWebinarQuota extend ActiveSupport::Concern
    included do
      before_save :check_webinar_quota
    end

    def check_webinar_quota
      if webinar.quota_reached?
        throw(:abort)
      end
    end
  end
end