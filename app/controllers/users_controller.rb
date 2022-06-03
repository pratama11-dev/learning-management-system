# frozen_string_literal: true

class UsersController < ApplicationController
  layout 'homes'
  def index; end

  def show; end

  def create
    new_user = User.new(user_params)
    new_user.full_name = new_user.name if new_user.name.present?
    new_user.confirmation_token = SecureRandom.hex

    if new_user.save
      return redirect_to root_path(confirmation: true, id: new_user.id), notice: 'Silakan pilih metode Konfirmasi.'
    end

    redirect_to root_path(register: true),
                notice: "Registrasi gagal, #{new_user.errors.full_messages.to_sentence}"
  end

  private

  def user_params
    params.require(:user).permit(
      :address, :birthday,
      :business_field, :city, :company, :company_address,
      :email, :password, :gender, :last_education,
      :name, :phone_number, :position,
      :subscription, :type_account, :username
    )
  end
end
