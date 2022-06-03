# frozen_string_literal: true

class AutoCourse
  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :lesson_id, type: String  
  field :user_lesson_id, type: String
  field :user_lesson_timestamp_id, type: String

  def user
    User.find(self.user_id)
  end
  
  def lesson
    Lesson.find(self.lesson_id)
  end

  def user_lesson
    UserLesson.find(self.user_lesson_id)
  end

  def user_lesson_timestamp
    UserLessonsTimestamp.find(self.user_lesson_timestamp_id)
  end
end
