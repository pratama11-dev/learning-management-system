# frozen_string_literal: true

class UserLikesController < ApplicationController
  def create
    service = ::Users::UserLikes::CreateService.new(
      params,
      current_user.id
    )
    unless service.run
      flash[:alert] = 'Gagal memberikan feedback'
      return redirect_to root_path
    end
    source = service.user_like.source

    partials = 'shared/buttons/play_bookmark_and_feedback'
    if params[:landing_page].present?
      partials = 'shared/buttons/play_bookmark_like_landing_page'
    end

    render json: {
      bookmark_and_feedback_html: render_to_string(
        partial: partials,
        locals: { source: source, options: { curriculum: source } }
      )
    }
  end
end
