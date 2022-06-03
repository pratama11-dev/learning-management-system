# frozen_string_literal: true

module Admin
  class WebinarsController < AdminController
    before_action :webinar, only: %i[show destroy]

    def index
      @new_webinar = Webinar.new
      @webinars = Webinar.all
    end

    def show; end

    def create      
      service = Webinars::CreateService.new(
        params
      )
      unless service.run
        flash[:alert] = "Webinar gagal disimpan, #{service.error_messages.to_sentence}"
        return redirect_to admin_webinars_path
      end
      flash[:notice] = 'Webinar berhasil disimpan'
      redirect_to admin_webinar_path(slug: service.webinar.slug)
    end

    def update
      service = Webinars::UpdateService.new(
        params
      )
      unless service.run
        flash[:alert] = "Webinar gagal diubah, #{service.error_messages.to_sentence}"
        return redirect_to admin_webinars_path
      end
      flash[:notice] = 'Webinar berhasil diubah'
      redirect_to admin_webinar_path(slug: service.webinar.slug)
    end

    def destroy
      webinar.destroy if webinar.present?
      redirect_to admin_webinars_path, notice: 'Webinar berhasil dihapus'
    end

    private

    def webinar
      @webinar ||= Webinar.find_by(slug: params[:slug])
    end
  end
end
