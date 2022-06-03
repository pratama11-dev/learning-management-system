# frozen_string_literal: true

module Admin
  class TalksController < AdminController
    before_action :talk, only: %i[show destroy]

    def index
      @new_talk = Talk.new
      @talks = Talk.all
      @videos = Video.where(resource_id: nil, resource_class: nil)
    end

    def show; end

    def create
      service = Talks::CreateService.new(
        params
      )
      unless service.run
        flash[:alert] = "Taxsamtalks gagal disimpan, #{service.error_messages.to_sentence}"
        return redirect_to admin_talks_path
      end
      flash[:notice] = 'Taxsamtalks berhasil disimpan'
      redirect_to admin_talk_path(service.talk)
    end

    def update
      service = Talks::UpdateService.new(
        params
      )
      unless service.run
        flash[:alert] = "Taxsamtalks gagal diubah, #{service.error_messages.to_sentence}"
        return redirect_to admin_talks_path
      end
      flash[:notice] = 'Taxsamtalks berhasil diubah'
      redirect_to admin_talk_path(service.talk)
    end

    def destroy
      talk.video.destroy if talk.present?
      talk.destroy if talk.present?
      redirect_to admin_talks_path, notice: 'Taxsamtalks berhasil dihapus'
    end

    def number_order_talks
      params[:ids].each_with_index do |id, index|
        Talk.find(id).update(order_number: index)
      end

      render json: { status: :ok }
    end

    private

    def talk
      @talk ||= Talk.find_by(id: params[:id])
    end
  end
end
