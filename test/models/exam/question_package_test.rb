# == Schema Information
#
# Table name: exam_question_packages
#
#  id               :uuid             not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  exam_package_id  :uuid             not null
#  exam_question_id :uuid             not null
#
# Indexes
#
#  index_exam_question_packages_on_exam_package_id   (exam_package_id)
#  index_exam_question_packages_on_exam_question_id  (exam_question_id)
#
# Foreign Keys
#
#  fk_rails_...  (exam_package_id => exam_packages.id)
#  fk_rails_...  (exam_question_id => exam_questions.id)
#
require "test_helper"

class Exam::QuestionPackageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
