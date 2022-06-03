# == Schema Information
#
# Table name: exam_answers
#
#  id               :uuid             not null, primary key
#  answer           :string
#  is_correct       :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  exam_question_id :uuid             not null
#
# Indexes
#
#  index_exam_answers_on_exam_question_id  (exam_question_id)
#
# Foreign Keys
#
#  fk_rails_...  (exam_question_id => exam_questions.id)
#
require "test_helper"

class Exam::AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
