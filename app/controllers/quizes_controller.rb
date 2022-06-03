# frozen_string_literal: true

class QuizesController < ApplicationController
  layout 'homes'
  before_action :require_login, :set_video, :set_lesson, :set_package, :set_quizes_service
  before_action :set_user_timestamp, :set_user_rating, only: [:ajax_submit_quiz]

  def show    
  end

  def ajax_show_quiz
    @question = @quizes_service.exam_question(params[:no])
    return render json: { message: "Question not found" }, status: :unprocessable_entity if @question.blank?
    render partial: "quizes/show_question"
  end

  def ajax_answer_quiz
    @quizes_service.update_answer({
      question_id: params[:question_id],
      answer_id: params[:answer_id]
    })
    @question = @quizes_service.exam_question_id(params[:question_id])
    render partial: "quizes/show_question"
  end

  def ajax_submit_quiz
    user_ratings_params = {
      user_rating: {
        resource_id: @lesson.id,
        resource_type: 'Lesson',
        rating: params[:score],
        comment: params[:comment]
      }
    }

    service = ::Users::UserRatings::CreateService.new(
      user_ratings_params,
      current_user.id
    )

    unless service.run
      return render json: { message: "Gagal memberikan rating" }, status: :unprocessable_entity
    end

    render json: {message: "success"}, status: :ok
  end

  private
  def set_video
    @video = Video.find(params[:id])
    return redirect_to root_path, alert: 'Video not found' if @video.blank?
  end

  def set_lesson
    @lesson = @video&.source
    return redirect_to root_path, alert: 'Lesson not found' if @lesson.blank?
  end

  def set_package
    @package = @lesson&.package
    return redirect_to root_path, alert: 'Quiz not found' if @package.blank?
  end

  def set_user_rating
    @user_rating = UserRating.where(
      user_id: current_user.id,
      resource_id: @lesson.id,
      resource_type: 'Lesson'
    ).first
  end

  def set_quizes_service
    @quizes_service = Quizes::QuizesService.new(
      @video, @lesson, 
      @package, current_user
    )

    @quizes_service.run
    if @quizes_service.error_messages.present?
      return redirect_to root_path, notice: @quizes_service.error_messages.to_sentence
    end
  end

  def set_user_timestamp
    @user_timestamp = UserLessonsTimestamp.find_or_initialize_by(
      user_id: current_user.id,
      lesson_id: @lesson.id
    )

    @user_timestamp.timestamp = @user_timestamp.max_timestamp
    @user_timestamp.save
  end
end
