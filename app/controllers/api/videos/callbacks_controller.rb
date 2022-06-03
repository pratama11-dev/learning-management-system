# frozen_string_literal: true

module Api
  module Videos
    class CallbacksController < Api::ApplicationController
      skip_before_action :verify_authenticity_token, only: :show
      before_action :auth_token_callback

      def show
        videos_service = WgVideos::BaseService.new
        @source_video = videos_service.show(@video.source_video_id)

        if @source_video[:stream].present? && !@source_video.is_a?(Boolean)
          @video.thumbnails = @source_video[:thumbnails]
          @video.thumbnail = @source_video[:thumbnail]
          @video.source_video_url = @source_video[:stream]
          @video.save!

          return render json: { message: 'data succesfully saved.' }, status: :ok
        end

        render json: { error: 'Record failed to saved.' }, status: :unprocessable_entity
      end

      private

      def auth_token_callback
        token_id = Base64.decode64(request.headers['X-CALLBACK-TOKEN'])
        @video = Video.find_by(id: token_id)
        raise StandardError, 'Video Tidak ditemukan' if @video.blank?
      rescue StandardError => e
        render json: { error: 'token unauthorized', message: e }, status: :unauthorized
      end
    end
  end
end
