# frozen_string_literal: true

class ProfilesController < ApplicationController
  layout 'homes'
  before_action :require_login
  def index; end

  def update
    current_user.update(user_params)
    current_user.update(name: current_user.full_name) if current_user.full_name.present?
    if !current_user.save
      return redirect_to profiles_path, alert: current_user.errors.full_messages.to_sentence
    end

    redirect_to profiles_path, notice: "User Berhasil di update"
  end

  private
  def user_params
    params.require(:user).permit(
      :full_name, :email, :phone_number, 
      :last_education, :nik, :kk_number, 
      :birthday, :gender, :address, 
      :rt, :rw, :province, :city, 
      :company, :company_address, 
      :business_field, :position, 
      :districts_company, :city_company,
      :avatar
    )
  end
end
