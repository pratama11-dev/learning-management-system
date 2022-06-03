# frozen_string_literal: true

module Exams
  class ExamService < BaseService
    def initialize(curriculum, current_user)
      @curriculum = curriculum
      @current_user = current_user      
    end

    def action
      set_package
      set_questions
      if @questions.blank?
        @error_messages << "Question not found, please contact admin to set the questions."
        return false
      end

      set_user_package_variant_result
      set_exam_user_variant_question
    end

    def update_answer(answer_params)
      exam_question = Exam::Question.find_by(id: answer_params[:question_id])
      is_correct = (exam_question.exam_answers.correct_answer.id == answer_params[:answer_id])
      
      user_answer = Exam::UserVariantAnswer.find_or_initialize_by({
        user_id: @current_user.id,
        exam_user_variant_question_id: @exam_user_variant_question.id,
        exam_question_id: answer_params[:question_id]
      })

      user_answer.exam_answer_id = answer_params[:answer_id]
      user_answer.is_correct =  is_correct
      user_answer.save
      
      @user_package_variant_result.update(submit_exam_at: DateTime.now)
      if @user_package_variant_result.complete?
        @user_package_variant_result.passed!
      else
        @user_package_variant_result.failed!
      end
    end

    def questions
      @questions
    end

    def user_package_variant_result
      @user_package_variant_result
    end

    def exam_user_variant_question
      @exam_user_variant_question
    end

    def exam_questions
      @exam_user_variant_question.questions
    end

    def exam_question(number)
      @exam_user_variant_question.questions[number.to_i]
    end

    def exam_answers(question_id, answer_id)
      if answer_id.present?
        return @exam_user_variant_question.exam_user_variant_answers.where(
          user_id: @current_user.id,
          exam_question_id: question_id,
          exam_answer_id: answer_id
        ).first.present?
      end

      @exam_user_variant_question.exam_user_variant_answers.where(
        user_id: @current_user.id,
        exam_question_id: question_id
      ).first.present?
    end

    def exam_answers_correct(question_id, answer_id)
      search_exam_answers_correct = @exam_user_variant_question.questions.pluck(:answers).flatten.select { |answer| 
        answer["id"] == answer_id 
      }.first
      
      return false if search_exam_answers_correct.blank?
      search_exam_answers_correct[:is_correct]
    end

    def exam_score
      @user_package_variant_result&.score
    end

    private
    def set_package
      @package ||= @curriculum.package
    end

    def set_questions
      @questions ||= @package.exam_questions
    end

    def set_user_package_variant_result     
      @user_package_variant_result = @package
        .exam_user_package_variant_results
        .where(
          user_id: @current_user.id,
          group: "remedial",
          result: "failed"
        ).order(remedial_exam_at: :desc)&.first

      if @user_package_variant_result.present? && 
        @user_package_variant_result.remedial_exam_at.present? && 
        (DateTime.now.utc < @user_package_variant_result.remedial_exam_at)
        return @user_package_variant_result
      end
      
      @user_package_variant_result = @package
        .exam_user_package_variant_results
        .find_or_initialize_by(
          user_id: @current_user.id,
          group: "exam"
        )
      
      if @user_package_variant_result.new_record?
        @user_package_variant_result.start_exam_at = DateTime.now.utc
        @user_package_variant_result.end_exam_at = DateTime.now.utc + @curriculum.exam_time.minutes
        @user_package_variant_result.code = sprintf('%05d', (@package.exam_user_package_variant_results.count + 1))
      end

      @user_package_variant_result.save 
    end

    def set_exam_user_variant_question
      @exam_user_variant_question = Exam::UserVariantQuestion.find_or_initialize_by(
        user_id: @current_user.id,
        exam_user_package_variant_result_id: @user_package_variant_result.id      
      )

      return @exam_user_variant_question if @exam_user_variant_question.persisted?      
      @questions.shuffle.each do |question|
        @exam_user_variant_question.questions << {
          question: question.as_json,
          answers: question.exam_answers.as_json
        }
      end

      @exam_user_variant_question.start_time = DateTime.now
      @exam_user_variant_question.save 
    end
  end
end
