module Api
  module Webinars
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

      def webinars
        return @webinars if @webinars.present?

        @webinars = Webinar.all.order(date: :desc)
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @webinars = @webinars
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @webinars = @webinars
            .search(query[:search])
        end

       @webinars
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
          pages: webinars.total_pages,
          perpage: page[:perpage],
          total: Webinar.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        webinars.each_with_index do |webinar, index|
          i = index + start_index
          @data[i] = {
            index: i,
            id: webinar.id,
            title: webinar.title.truncate(100),
            description: webinar.description.truncate(100),
            speaker: webinar.speaker,
            date: "#{webinar.date.localtime.strftime('%d %B %Y %H:%M')} WIB",
            quota_reached: webinar.total_participants,
            capacity: webinar.capacity,
            show_path: admin_webinar_path(slug: webinar.slug),
            edit_path: admin_update_webinar_path(slug: webinar.slug),
            delete_path: admin_webinar_path(slug: webinar.slug)
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
