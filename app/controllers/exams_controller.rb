# frozen_string_literal: true

class ExamsController < ApplicationController
  layout 'homes'
  before_action :require_login, :curriculum, :exam_service
  before_action :exam_duration, except: [:remedial_exam, :review_exam]

  def show
    if exam_validation
      return redirect_after_exam
    end
  end

  def remedial_exam    
    exam_service.user_package_variant_result.remedial!
    if exam_service.user_package_variant_result.remedial_exam_at.blank?
      exam_service.user_package_variant_result.update(remedial_exam_at: DateTime.now.utc + 7.days)
    end
    return redirect_to root_path(curriculum_id: curriculum.id), notice: "Remedial Telah di jadwalkan."
  end

  def ajax_show_exam
    @question = @exam_service.exam_question(params[:no])
    render partial: "exams/show_exam"
  end

  def ajax_answer_exam
    @exam_service.update_answer({
      question_id: params[:question_id],
      answer_id: params[:answer_id]
    })
  end

  def ajax_submit_exam    
    user_ratings_params = {
      user_rating: {
        resource_id: @curriculum.id,
        resource_type: 'Curriculum',
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
    exam_service.user_package_variant_result.update(
      end_exam_at: DateTime.now
    )

    render json: {message: "success", score: exam_service.exam_score}, status: :ok
  end

  private
  def curriculum
    @curriculum ||= Curriculum.find(params[:id])
  end

  def exam_service
    return @exam_service if @exam_service.present?
    @exam_service = Exams::ExamService.new(
      curriculum, 
      current_user
    )

    @exam_service.run
    if @exam_service.error_messages.present?
      return redirect_to root_path, notice: @exam_service.error_messages.to_sentence
    end
  end

  def exam_validation
    (exam_service.user_package_variant_result.group != "exam") ||
    exam_service.user_package_variant_result.remedial?
  end

  def exam_duration
    return @exam_duration = 10 * 1000 if params[:disabled].present?
    duration_1 = DateTime.now.utc
    duration_2 = exam_service.user_package_variant_result.end_exam_at
    return redirect_after_exam if duration_2.blank?
    @exam_duration = (duration_2 - duration_1).ceil
    return redirect_after_exam if @exam_duration.negative?

    @exam_duration
  end

  def redirect_after_exam    
    redirect_to review_exam_path(params[:id]), notice: "ujian telah selesai"
  end
end
