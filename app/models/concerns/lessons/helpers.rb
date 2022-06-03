# frozen_string_literal: true

module Lessons
  module Helpers
    extend ActiveSupport::Concern
    def video
      Video.find_by(resource_id: id, resource_class: 'Lesson')
    end

    def free?
      self.is_free
    end

    def next_lesson
      curriculum.lessons.where('created_at > ?', self.created_at).order(:created_at)&.first
    end

    def package
      Exam::Package.find_or_create_by(
        resource_type: "Lesson", 
        resource_id: id, 
        is_active: true
      )
    end

    def progress(user)
      @user_timestamp = UserLessonsTimestamp.find_or_initialize_by(
        user_id: user.id,
        lesson_id: self.id,
      )

      progress = 0 
      if @user_timestamp.max_timestamp.to_i > 0
        progress = @user_timestamp.timestamp.to_i * 100 / @user_timestamp.max_timestamp.to_i      
      end
      return progress
    end
  end
end
