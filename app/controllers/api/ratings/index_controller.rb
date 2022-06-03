module Api
  module Ratings
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

      def user_ratings
        return @user_ratings if @user_ratings.present?

        @user_ratings = UserRating.all
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @user_ratings = @user_ratings
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @user_ratings = @user_ratings
            .search(query[:search])
        end

       @user_ratings
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
          pages: user_ratings.total_pages,
          perpage: page[:perpage],
          total: UserRating.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        user_ratings.each_with_index do |user_rating, index|
          i = index + start_index
          @data[i] = {
            index: i,
            user: user_rating.user&.name,
            resource: (user_rating.source&.name || user_rating.source&.title || ""),
            resource_type: user_rating.resource_type,
            rating: user_rating.rating,
            comment: user_rating.comment
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
