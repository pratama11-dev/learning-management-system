module Api
  module Users
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

      def users
        return @users if @users.present?

        @users = User.all
          .page(page[:page])
          .per(page[:perpage])

        if sort.present?
          @users = @users
            .reorder("#{sort[:field]}": sort[:sort])
        end
        if query.present? && query.dig(:search).present?
          @users = @users
            .search(query[:search])
        end

       @users
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
          pages: users.total_pages,
          perpage: page[:perpage],
          total: User.count
        }
      end

      def data
        return @data if @data.present?

        @data = {}
        users.each_with_index do |account, index|
          i = index + start_index
          @data[i] = {
            index: i,
            name: account.name,
            email: account.email,
            created_at: account.created_at.strftime("%a, %d %b %Y"),
            subscription: account.subscription,
            show_path: admin_user_path(id: account.id),
            edit_path: edit_admin_user_path(id: account.id),
            delete_path: admin_user_path(id: account.id)
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
