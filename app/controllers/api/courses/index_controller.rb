module Api
  module Courses
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

      def courses
        return @courses if @courses.present?

        @courses = Course.all
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @courses = @courses
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @courses = @courses
            .search(query[:search])
        end

       @courses
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
          pages: courses.total_pages,
          perpage: page[:perpage],
          total: Course.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        courses.each_with_index do |course, index|
          i = index + start_index
          @data[i] = {
            index: i,
            name: course.name,
            description: course.description,
            created_at: course.created_at.strftime("%a, %d %b %Y"),
            show_path: admin_course_path(id: course.id),
            delete_path: admin_course_path(id: course.id)
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
