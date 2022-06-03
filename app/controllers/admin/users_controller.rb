# frozen_string_literal: true

module Admin
  class UsersController < AdminController
    def index; end
    
    def show
      @user = User.find_by(id: params[:id])
    end
  end
end
