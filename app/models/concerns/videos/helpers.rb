# frozen_string_literal: true

module Videos
  module Helpers
    extend ActiveSupport::Concern
    def source
      eval(self.resource_class).find_by(id: self.resource_id)
    end

    def next_video
      if self.resource_class == "Talk"
        return Talk.where("created_at > ?", self.source.created_at)
        .where.not(id: self.source.id)
        .order(:created_at).first
      end

      if self.resource_class == "Lesson"
        next_lesson = self.source.next_lesson
        return next_lesson.try(:video)
      end
    end    
  end
end
