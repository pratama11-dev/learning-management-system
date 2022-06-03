# frozen_string_literal: true

module Registrations
  class ConfirmationsController < Clearance::UsersController
    layout 'session'

    def new
      @user = User.find_by(id: params[:id])
    end

    def show
      user = User.find_by confirmation_token: params[:confirmation_token]
      return redirect_to sign_in_path, alert: t('user_c.Confirmation token invalid') if user.blank?

      user.is_confirmed = 'active'
      user.add_role(:user) if user.roles.blank?
      user.name = user.email.split('@').first
      user.full_name = user.name
      user.username = user.name
      user.save!

      sign_in(user)
      redirect_to root_path, notice: t('user_c.Email was successfully confirmed')
    end

    def send_confirmation
      @user = User.find_by(id: params[:id])
      return redirect_to root_path, alert: 'User Tidak ditemukan' if @user.blank?

      send_email if params[:type] == 'email'
      send_wa if params[:type] == 'whatsApp'

      redirect_to root_path(confirmation: true, id: @user.id),
                  notice: 'Link Konfirmasi akun telah terkirim, silakan cek inbox email/WA anda.'
    end

    private

    def send_wa
      wa_service = Whatsapp::BaseService.new(
        user_id: @user.id,
        url: registrations_show_confirmations_url(confirmation_token: @user.confirmation_token)
      )
      wa_service.run
    end

    def send_email
      Emails::RegistrationConfirmationJob.perform_later(@user.id)
    end
  end
end
