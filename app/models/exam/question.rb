# == Schema Information
#
# Table name: exam_questions
#
#  id         :uuid             not null, primary key
#  archive    :boolean
#  category   :string
#  note       :text
#  quest      :text
#  updated_by :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Exam::Question < ApplicationRecord
  has_many :exam_answers, dependent: :destroy, class_name: 'Exam::Answer', foreign_key: 'exam_question_id'
  has_many :question_packages, dependent: :destroy, class_name: 'Exam::QuestionPackage', foreign_key: 'exam_question_id'
  has_many :exam_packages, through: :question_packages, class_name: 'Exam::Package', foreign_key: 'exam_question_id'
end
