module Api
  module Lessons
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

      def lessons
        return @lessons if @lessons.present?

        @lessons = Lesson.all
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @lessons = @lessons
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @lessons = @lessons
            .search(query[:search])
        end

       @lessons
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
          pages: lessons.total_pages,
          perpage: page[:perpage],
          total: Lesson.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        lessons.each_with_index do |lesson, index|
          like_count = lesson.total_feedback[:like]
          dislike_count = lesson.total_feedback[:dislike]

          i = index + start_index
          @data[i] = {
            index: i,
            name: lesson.name,
            description: lesson.description,
            category_name: lesson.category_name,
            created_at: lesson.created_at.strftime("%a, %d %b %Y"),
            show_path: admin_lesson_path(id: lesson.id),
            delete_path: admin_lesson_path(id: lesson.id),
            like_count: like_count,
            dislike_count: dislike_count
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
