# frozen_string_literal: true

class UserRatingsController < ApplicationController
  def create
    service = ::Users::UserRatings::CreateService.new(
      params,
      current_user.id
    )
    unless service.run
      flash[:alert] = 'Gagal memberikan rating'
      return redirect_to root_path
    end
    flash[:success] = 'Berhasil memberikan rating'
    redirect_to root_path
  end
end
