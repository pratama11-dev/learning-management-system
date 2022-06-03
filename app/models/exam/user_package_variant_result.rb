# == Schema Information
#
# Table name: exam_user_package_variant_results
#
#  id               :uuid             not null, primary key
#  code             :string
#  end_exam_at      :datetime
#  group            :string
#  remedial_exam_at :datetime
#  result           :string
#  start_exam_at    :datetime
#  submit_exam_at   :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  exam_package_id  :uuid             not null
#  user_id          :uuid
#
# Indexes
#
#  index_exam_user_package_variant_results_on_exam_package_id  (exam_package_id)
#
# Foreign Keys
#
#  fk_rails_...  (exam_package_id => exam_packages.id)
#
class Exam::UserPackageVariantResult < ApplicationRecord
  belongs_to :exam_package, class_name: 'Exam::Package', foreign_key: 'exam_package_id'
  before_destroy :destroy_exam_user_variant_questions

  enum result: {
    passed: 'passed',
    failed: 'failed'
  }

  enum group: {
    remedial: 'remedial',
    exam: 'exam'
  }

  def exam_user_variant_questions
    Exam::UserVariantQuestion.where(exam_user_package_variant_result_id: id)
  end

  def destroy_exam_user_variant_questions
    exam_user_variant_questions.each do |exam_user_variant_question|
      exam_user_variant_question.exam_user_variant_answers.destroy_all
    end

    exam_user_variant_questions.destroy_all
  end

  def exam_user_variant_question
    exam_user_variant_questions&.first
  end

  def user_exam_answers
    exam_user_variant_question&.exam_user_variant_answers
  end

  def complete?
    if exam_user_variant_question.blank?
      return false 
    end
    score >= min_score
  end

  def score
    return 0 if user_exam_answers.blank?
    user_exam_answers.scores
  end

  def min_score
    return 80 if self.exam_package.resource.try(:exam_minimum_score).blank?
    self.exam_package.resource&.exam_minimum_score
  end
end
