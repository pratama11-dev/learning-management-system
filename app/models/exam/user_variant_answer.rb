# frozen_string_literal: true

class Exam::UserVariantAnswer
  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :exam_user_variant_question_id, type: String  
  field :exam_question_id, type: String  
  field :exam_answer_id, type: String  
  field :is_correct, type: Boolean, default: false  

  def exam_user_variant_question
    Exam::UserVariantQuestion.where(id: exam_user_variant_question_id).first
  end

  def user
    User.find_by_id(user_id)
  end

  def self.scores
    return 0 if self.count.zero? || self.first.exam_user_variant_question.questions.count.zero?
    (where(is_correct: true).count.to_f / self.first.exam_user_variant_question.questions.count * 100).round(2)
  end
end