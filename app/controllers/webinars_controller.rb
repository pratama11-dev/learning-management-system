# frozen_string_literal: true

class WebinarsController < ApplicationController
  layout 'homes'
  before_action :require_login
  before_action :webinar, only: [:show]

  def show
    if @webinar.tag.include?("coming_soon")
      return redirect_to root_path, notice: "webinar akan datang" 
    end
    
    @webinars = Webinar.where.not(slug: params[:slug]).order(date: :asc)
    @webinar_participants = UserWebinar.where(webinar_id: webinar.id).first(5)
  end

  private

  def webinar
    @webinar ||= Webinar.find_by(slug: params[:slug])
  end
end
