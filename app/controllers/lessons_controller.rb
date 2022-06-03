# frozen_string_literal: true

class LessonsController < ApplicationController
  layout 'homes'
  before_action :require_login
  def show
    @lesson = Lesson.find_by_id(params[:id])
    @course = @lesson.curriculum.course
    @lessons = @course.curriculums.map(&:lessons).flatten
    @lessons_grouped = @lessons.select {|lesson| lesson.learning_name == @lesson.learning_name}
    @lessons_categories = @lessons_grouped.group_by(&:category_name)
  end
end
