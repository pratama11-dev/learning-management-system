# frozen_string_literal: true

module Quizes
  class QuizesService < BaseService
    def initialize(video, lesson, package, current_user)
      @video = video
      @lesson = lesson
      @package = package
      @current_user = current_user      
    end

    def action
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

    def exam_question_id(question_id)
      @exam_user_variant_question.questions.select { |question| 
        question[:question][:id] == question_id
      }&.first
    end

    def exam_user_variant_answers
      @exam_user_variant_question.exam_user_variant_answers
    end

    def exam_answers(question_id, answer_id)
      if answer_id.present?
        return exam_user_variant_answers.where(
          exam_question_id: question_id,
          exam_answer_id: answer_id
        ).first.present?
      end

      exam_user_variant_answers.where(
        exam_question_id: question_id
      ).first.present?
    end

    def exam_answer_correct(question_id)
      exam_user_variant_answers.where(
        exam_question_id: question_id
      )&.first&.is_correct.present?
    end

    private
    def set_questions
      @questions ||= @package.exam_questions
    end

    def set_user_package_variant_result     
      @user_package_variant_result = @package.exam_user_package_variant_results.find_or_initialize_by(
        user_id: @current_user.id
      )
      
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
