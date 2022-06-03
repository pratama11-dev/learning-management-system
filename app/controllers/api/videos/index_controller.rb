module Api
  module Videos
    class IndexController < Api::ApplicationController
      def show        
        render json: result
      end

      private
      def result
        {
          meta: meta,
          data: data
        }
      end

      def videos
        return @videos if @videos.present?

        @videos = Video.where(resource_class: nil, resource_id: nil)
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @videos = @videos
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @videos = @videos
            .search(query[:search])
        end

       @videos
      end

      def sort
        params[:sort]
      end

      def query
        params[:query]
      end

      def page
        params.require(:pagination)
      end

      def meta
        {
          page: page[:page],
          pages: videos.total_pages,
          perpage: page[:perpage],
          total: Video.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        videos.each_with_index do |video, index|
          i = index + start_index
          @data[i] = {
            index: i,
            id: video.id,
            name: video.name,
            description: video.description,
            created_at: video.created_at.strftime("%a, %d %b %Y"),
            show_path: admin_video_path(id: video.id),
            edit_path: edit_admin_video_path(id: video.id),
            preview_path: video_path(id: video.id),
            delete_path: admin_video_path(id: video.id)
          }
        end

        @data
      end

      def start_index
        if page[:page].to_i <= 1
          return 1
        end

        ((page[:page].to_i - 1) * page[:perpage].to_i) + 1
      end
    end
  end
end
