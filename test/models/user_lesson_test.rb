# frozen_string_literal: true

# == Schema Information
#
# Table name: user_lessons
#
#  id         :uuid             not null, primary key
#  phase      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  lesson_id  :uuid             not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_user_lessons_on_lesson_id  (lesson_id)
#  index_user_lessons_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (lesson_id => lessons.id)
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class UserLessonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
