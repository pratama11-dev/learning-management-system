# frozen_string_literal: true

class SearchController < ApplicationController
  layout 'homes'
  def index
    @curriculums = Curriculum.where('curriculums.name = ?', "#{params[:curriculum]}")
    @webinars = Webinar.all.order(date: :asc).limit(10)
    @talks = Talk.all.limit(10)
    @learning_taxes = Lesson.where('lessons.learning_name = ?', "#{params[:lessons].to_s.squish}").group_by {|l| l.learning_name.squish}
  end
end
