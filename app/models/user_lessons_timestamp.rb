# frozen_string_literal: true

class UserLessonsTimestamp
  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :lesson_id, type: String
  field :user_lesson_id, type: String
  field :timestamp, type: String
  field :max_timestamp, type: String

  def user_lesson
    UserLesson.find_by(user_id: user_id, lesson_id: lesson_id)
  end
end
