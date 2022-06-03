# frozen_string_literal: true

class UserWebinarsController < ApplicationController
  def create
    service = ::Users::UserWebinars::CreateService.new(
      params,
      current_user.id
    )
    unless service.run
      service.user_webinar.webinar.quota_reached? ? error_message = "Kuota sudah penuh" : error_message = service.error_messages.to_sentence
      webinar_participants = UserWebinar.where(webinar_id: service.user_webinar.webinar.id).first(5)
      render json: {
        error_message: error_message,
        button_html: render_to_string(
          partial: 'webinars/partials/button',
          locals: {webinar: service.user_webinar.webinar}
        ),
        participant_html: render_to_string(
          partial: 'webinars/partials/participant',
          locals: {webinar_participants: webinar_participants}
        ),
        remaining_quota: "Kuota tersisa #{service.user_webinar.webinar.remaining_quota} orang",
        status: 'failed',
        homes_webinars_button_html: render_to_string(
          partial: 'homes/partials/register_webinar_button',
          locals: {webinar: service.user_webinar.webinar}
        )
      }
    else
      webinar_participants = UserWebinar.where(webinar_id: service.user_webinar.webinar.id).first(5)
      render json: {
        button_html: render_to_string(
          partial: 'webinars/partials/button',
          locals: {webinar: service.user_webinar.webinar}
        ),
        participant_html: render_to_string(
          partial: 'webinars/partials/participant',
          locals: {webinar_participants: webinar_participants}
        ),
        remaining_quota: "Kuota tersisa #{service.user_webinar.webinar.remaining_quota} orang",
        status: service.user_webinar.status,
        homes_webinars_button_html: render_to_string(
          partial: 'homes/partials/register_webinar_button',
          locals: {webinar: service.user_webinar.webinar}
        )
      }
    end
  end

  def destroy
    destroy_user_webinar = UserWebinar.find_by(id: params[:id])
    webinar = destroy_user_webinar.webinar
    destroy_user_webinar.destroy! if destroy_user_webinar.present?
    webinar_participants = UserWebinar.where(webinar_id: params[:webinar_id]).first(5)
    if params[:admin_page] == "true"
      return redirect_to admin_webinar_path(slug: webinar.slug)
    end
    render json: {
      button_html: render_to_string(
        partial: 'webinars/partials/button',
        locals: { webinar: webinar }
      ),
      participant_html: render_to_string(
        partial: 'webinars/partials/participant',
        locals: { webinar_participants: webinar_participants }
      ),
      remaining_quota: "Kuota tersisa #{webinar.remaining_quota} orang"
    }
  end
end
