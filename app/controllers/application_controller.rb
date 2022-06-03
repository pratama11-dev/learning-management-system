# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Clearance::Controller
  include DateHelper
  before_action :set_locale
  before_action :set_notifications

  def require_subscribe
    redirect_to sign_in_path, notice: t('app_c.You must login first to access this page') if current_user.blank?
  end

  def require_admin
    unless current_user.is_admin? || current_user.is_super_admin?
      redirect_to dashboard_path, notice: t('app_c.You cannot access this page')
    end
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  rescue StandardError => e
    I18n.locale = I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def require_login
    return redirect_to root_path(login: true), notice: 'Silakan login terlebih dahulu.' unless signed_in?
  end

  def set_notifications
    return @notifications = [] if current_user.blank?
    @notifications = current_user.notifications.limit(10)
  end
end
