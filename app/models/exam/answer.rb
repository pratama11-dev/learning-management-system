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
class Exam::Answer < ApplicationRecord
  belongs_to :exam_question, class_name: 'Exam::Question', foreign_key: 'exam_question_id'

  def self.correct_answer
    find_by(is_correct: true)
  end
end
