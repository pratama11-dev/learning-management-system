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
class Exam::QuestionPackage < ApplicationRecord
  belongs_to :exam_package, class_name: 'Exam::Package', foreign_key: 'exam_package_id'
  belongs_to :exam_question, class_name: 'Exam::Question', foreign_key: 'exam_question_id'
end
