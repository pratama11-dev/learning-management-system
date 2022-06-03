# frozen_string_literal: true

class UserBookmarksController < ApplicationController
  def create
    service = ::Users::UserBookmarks::CreateService.new(
      params,
      current_user.id
    )
    unless service.run
      flash[:alert] = 'Gagal membookmark'
      return redirect_to root_path
    end
    source = service.user_bookmark.source

    partials = 'shared/buttons/play_bookmark_and_feedback'
    if params[:landing_page].present?
      partials = 'shared/buttons/play_bookmark_like_landing_page'
    end

    if params[:user_bookmarks][:resource_type] == "Talk"
      partials = 'shared/buttons/play_bookmark_like_landing_page_talks'
    end

    render json: {
      bookmark_and_feedback_html: render_to_string(
        partial: partials,
        locals: { source: source, options: {} }
      ),
      is_bokmarked: service.user_bookmark.persisted?
    }
  end
end
