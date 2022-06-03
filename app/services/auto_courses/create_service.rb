# frozen_string_literal: true

module AutoCourses
  class CreateService < ::BaseService
    def initialize(lesson_id, user_ids)
      @lesson_id = lesson_id
      @user_ids = user_ids.pluck(:id)
    end

    def action
      @user_ids.each do |user_id|        
        user = User.find(user_id)
        user_lesson = user.user_lessons.find_or_initialize_by(lesson: lesson)
        user_lesson.phase = "quiz"
        user_lesson.save!

        if user_lesson.user_lesson_timestamp.present?
          user_lesson_timestamp = user_lesson.user_lesson_timestamp.first
        else
          user_lesson_timestamp = UserLessonsTimestamp.new(
            user_id: user_id, 
            lesson_id: lesson.id, 
            user_lesson_id: user_lesson.id
          )          
        end
        user_lesson_timestamp.timestamp =  2.hours.to_s
        user_lesson_timestamp.max_timestamp = 2.hours.to_s
        user_lesson_timestamp.save!

        auto_course = AutoCourse.find_or_initialize_by(
          lesson_id: @lesson_id,
          user_id: user_id,
          user_lesson_id: user_lesson.id, 
          user_lesson_timestamp_id: user_lesson_timestamp.id
        )
        auto_course.save!
      end
    end

    private
    def lesson
      @lesson ||= Lesson.find(@lesson_id)
    end
  end
end
