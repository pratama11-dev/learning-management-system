# frozen_string_literal: true

class Exam::UserVariantQuestion 
  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :exam_user_package_variant_result_id, type: String
  field :start_time, type: DateTime
  field :questions, type: Array, default: []
  
  def exam_user_package_variant_result
    Exam::UserPackageVariantResult.find_by_id(exam_user_package_variant_result_id)
  end

  def exam_user_variant_answers
    Exam::UserVariantAnswer.where(exam_user_variant_question_id: id.to_s)
  end

  def user
    User.find_by_id(user_id)
  end
end