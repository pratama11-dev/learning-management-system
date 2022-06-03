# frozen_string_literal: true

class AdminController < ApplicationController
  include Clearance::Controller
  layout 'admin'
  before_action :require_login
  before_action :only_admin
  before_action :set_locale

  private

  def only_admin
    unless current_user.is_admin?
      return redirect_to root_path, notice: 'Anda tidak memiliki akses ke halaman ini'
    end
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  rescue StandardError => e
    I18n.locale = I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale }
  end
end
