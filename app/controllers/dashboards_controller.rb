# frozen_string_literal: true

class DashboardsController < ApplicationController
  layout 'homes'
  before_action :require_login, only: :index
  def index
    @user_webinars = current_user.webinars.order(date: :desc)
    @active_webinars = Webinar.where('date > ?', Date.today).where.not(id: @user_webinars.ids)
    @bookmarks = current_user.bookmarks.order(created_at: :desc)
    @lessons = Lesson.trendings.limit(5)

    @user_lessons = current_user.lessons
    @user_curriculum = @user_lessons.map(&:curriculum).uniq
    @user_course = @user_curriculum.map(&:course).uniq
  end
end
