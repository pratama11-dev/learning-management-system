module Api
  module Talks
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

      def talks
        return @talks if @talks.present?

        @talks = Talk.all
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @talks = @talks
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @talks = @talks
            .search(query[:search])
        end

       @talks
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
          pages: talks.total_pages,
          perpage: page[:perpage],
          total: Talk.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        talks.each_with_index do |talk, index|
          like = 0
          dislike = 0
          talk.total_feedback.map do |k,v|
            if k.to_s == 'like'
              like = v
            end
            if k.to_s == 'dislike'
              dislike = v
            end
          end
          i = index + start_index
          @data[i] = {
            index: i,
            id: talk.id,
            name: talk.name,
            description: talk.description,
            like: like,
            dislike: dislike,
            created_at: talk.created_at.strftime("%a, %d %b %Y"),
            show_path: admin_talk_path(id: talk.id),
            edit_path: edit_admin_talk_path(id: talk.id),
            delete_path: admin_talk_path(id: talk.id)
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
