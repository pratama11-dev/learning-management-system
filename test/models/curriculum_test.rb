# frozen_string_literal: true

# == Schema Information
#
# Table name: curriculums
#
#  id                 :uuid             not null, primary key
#  description        :text
#  exam_minimum_score :float
#  exam_time          :integer
#  name               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  course_id          :uuid             not null
#
# Indexes
#
#  index_curriculums_on_course_id  (course_id)
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
require 'test_helper'

class CurriculumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
