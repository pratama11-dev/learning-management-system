# frozen_string_literal: true

# == Schema Information
#
# Table name: lessons
#
#  id            :uuid             not null, primary key
#  category_name :string
#  description   :text
#  is_free       :boolean          default(TRUE)
#  learning_name :string
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  curriculum_id :uuid
#
# Indexes
#
#  index_lessons_on_curriculum_id  (curriculum_id)
#
# Foreign Keys
#
#  fk_rails_...  (curriculum_id => curriculums.id)
#
require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
