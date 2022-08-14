# frozen_string_literal: true

class HomesController < ApplicationController
  layout 'homes'
  def index
    @banners = Banner.all.limit(10)
    @learning_taxes = Lesson.all.order(created_at: :asc).group_by {|l| l.learning_name.squish}

    # login to access this page
    return redirect_to new_authentications_session_path, notice: 'Silakan login terlebih dahulu.' unless signed_in?

  end

  def ajax_index_phone_partial
    @banners = Banner.all.limit(10)
    @learning_taxes = Lesson.all.order(created_at: :asc).group_by {|l| l.learning_name.squish}
    @talks = Talk.all.limit(10)
    @webinars = Webinar.all.order(date: :asc).limit(10)
    @curriculums = Curriculum.all.order(created_at: :asc)
    @courses = Course.all.order(created_at: :asc)

    render partial: "homes/phone_partials/#{params[:partial_path]}", layout: false
  end

  def ajax_index_partial
    @talks = Talk.all.limit(10)
    @webinars = Webinar.all.order(date: :asc).limit(10)
    @curriculums = Curriculum.all.order(created_at: :asc)
    @courses = Course.all.order(created_at: :asc)
    @learning_taxes = Lesson.all.order(created_at: :asc).group_by {|l| l.learning_name.squish}

    render partial: "homes/desktop_partials/#{params[:partial_path]}", layout: false
  end

  def ajax_show_curriculum_partial
    @lesson = Lesson.find_by(id: params[:lesson_id])
    return render json: {}, status: :not_found if @lesson.blank?

    render partial: "homes/desktop_partials/partials/show_curriculum", locals: {lesson: @lesson, learning_name: @learning_name}, layout: false
  end

  def ajax_show_brevet_partial
    @curriculum = Curriculum.includes(:lessons).find_by(id: params[:curriculum_id])

    @exam_user_package_variant_result = @curriculum.exam_user_package_variant_result(current_user)
    if @exam_user_package_variant_result.present?
      if @exam_user_package_variant_result.end_exam_at.blank?
        @exam_complete = false
      else
        @exam_complete = (DateTime.now.utc > @exam_user_package_variant_result.end_exam_at)
      end
    end

    return render json: {}, status: :not_found if @curriculum.blank?

    render partial: "homes/desktop_partials/partials/show_brevet", locals: {
      curriculum: @curriculum,
      course: @curriculum.course
    }, layout: false
  end
end
