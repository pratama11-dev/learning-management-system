# frozen_string_literal: true

class CoursesController < ApplicationController
  layout false
  before_action :require_login, only: [:show]

  def index
    @curriculums = Curriculum.all.order(created_at: :asc)
    @courses = Course.all.order(created_at: :asc)
    @learning_taxes = Lesson.all.order(created_at: :asc).group_by {|l| l.learning_name.squish}
  end

  def show
    @curriculum = Curriculum.find_by_id(params[:id])
    @exam_user_package_variant_result = @curriculum.exam_user_package_variant_result(current_user)
    if @exam_user_package_variant_result.present?
      if @exam_user_package_variant_result.end_exam_at.blank?
        @exam_complete = false
      else
        @exam_complete = (DateTime.now.utc > @exam_user_package_variant_result.end_exam_at)
      end
    end
  end
end
