# frozen_string_literal: true

module Admin
  class VideosController < AdminController
    skip_before_action :verify_authenticity_token, only: :upload
    before_action :video, only: %i[show destroy update]

    def index
      @new_video = Video.new
      @videos = Video.where(resource_class: nil, resource_id: nil)
    end

    def show; end

    def create
      return redirect_to admin_videos_path, alert: 'Video tidak ditemukan' if video.blank?

      video.assign_attributes(video_params)

      if video.save
        VideoProcessingWorker.perform_async(
          url_for(video.file),
          video.id,
          'Video',
          api_videos_callback_url
        )
        return redirect_to admin_videos_path, notice: 'video berhasil di upload'
      end

      redirect_to admin_videos_path, alert: "video gagal di upload, #{@video.errors.full_messages}"
    end

    def update
      video.assign_attributes(video_params)
      return redirect_to admin_videos_path, notice: 'video berhasil di simpan' if video.save

      redirect_to admin_videos_path, alert: "video gagal di simpan, #{video.errors.full_messages}"
    end

    def destroy
      @video.destroy if video.present?
      redirect_to admin_videos_path, notice: 'video berhasil di hapus'
    end

    def upload
      @video = Video.new
      @video.file.attach(params[:files].first) if params[:files].present?

      return render json: { video: @video }, status: :ok if @video.save

      render json: { error: @video.errros.full_messages }, status: :unprocessable_entity
    end

    def update_timestamp
      video.timestamps = params[:video][:timestamps]
      video.save

      redirect_to admin_video_path(video), notice: 'video berhasil di update'
    end

    private

    def video
      @video ||= Video.find_by(id: params[:id] || params[:video][:id])
    end

    def video_params
      params.require(:video).permit(:name, :description, :timestamps)
    end
  end
end
