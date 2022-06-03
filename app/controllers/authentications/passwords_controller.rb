# frozen_string_literal: true

module Authentications
  class PasswordsController < ApplicationController
    layout 'session'

    def new
      render template: 'passwords/new'
    end

    def create
      user = User.find_by(email: params[:password][:email])
      if user.present?
        user.forgot_password!
        Emails::ForgetPasswordJob.perform_later(user.id)
      end

      redirect_to root_path, notice: "Reset password telah di kirim ke #{params[:password][:email]}"
    end

    def edit
      @user = User.find_by(id: params[:id], confirmation_token: params[:token])
      return redirect_to root_path, notice: 'Token sudah digunakan, silakan ulangi reset password.' if @user.blank?

      render template: 'passwords/edit'
    end

    def update
      @user = User.find_by(id: params[:id], confirmation_token: params[:token])
      @user.password = params[:password_reset][:password]

      return redirect_to root_path(login: true), notice: 'Reset password telah berhasil, silakan login.' if @user.save

      redirect_to root_path, alert: 'Reset password gagal, silakan ulangi reset password.'
    end
  end
end
