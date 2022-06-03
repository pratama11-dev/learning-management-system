class UserCertificatesController < ApplicationController
  before_action :set_user_certificate, only: [:generate_certificate]
  before_action :set_base_source, only: [:generate_certificate]
  layout "homes"

  include Barcodeable

  def index
    @user = User.find(params[:user_id])
    @user_lessons = @user.lessons
    @user_curriculum = @user_lessons.map(&:curriculum).uniq
    @user_course = @user_curriculum.map(&:course).uniq

    @user_certificates = UserCertificate.where(user_id: params[:user_id])
  end

  def generate_certificate
    if @user_certificate&.base_source&.is_a? Webinar
      @claim_date = @user_certificate.base_resource.date.localtime + @user_certificate.base_resource.certificate_claim_duration.to_i.days
      if @claim_date > DateTime.now.localtime
        return redirect_to root_path, notice: "Sertifikat belum bisa diclaim, dapat di download pada tanggal #{@claim_date.strftime('%d %B %Y')}"
      end
    end

    if @user_certificate.present?
      respond_to do |format|
        format.pdf do
          render template: 'certificates/generate_certificate.html.slim',
          pdf: "Sertifikat",
          orientation: 'Landscape',
          page_size: 'A4',
          page_height: 280,
          page_width: 204,
          background: false,
          margin: { top: 0, bottom: 0 , left:  0, right: 0}
        end
      end
    elsif !@user_certificate.present? && @base_source.certificate_claimable?
      create_user_certificate
    elsif !@user_certificate.present? && !@base_source.certificate_claimable?
      flash[:alert] = 'Sertifikat sudah tidak bisa diclaim'
      return redirect_to dashboards_path
    end
  end

  def create_user_certificate
    service = ::Users::UserCertificates::CreateService.new(
      params,
      user.id
    )

    unless service.run
      flash[:alert] = 'Gagal membuat dan mengunduh sertifikat'
      return redirect_to root_path
    end

    return redirect_to generate_certificate_path(
      resource_id: service.user_certificate.resource_id,
      resource_type: service.user_certificate.resource_type,
      base_resource_type: service.user_certificate.base_resource_type,
      base_resource_id: service.user_certificate.base_resource_id,
      user_id: service.user_certificate.user_id,
      format: params[:format],
      type: params[:type]
    )
  end

  private
    def user
      @user = current_user || User.find(params[:user_id])
    end

    def set_user_certificate
      @user_certificate ||= UserCertificate.find_by(
        resource_id: params['resource_id'],
        resource_type: params['resource_type'],
        base_resource_type: params['base_resource_type'],
        base_resource_id: params['base_resource_id'],
        user_id: user
      )
    end

    def set_base_source
      @base_source ||= params['base_resource_type'].constantize.find_by(id: params['base_resource_id'])
    end

    def barcode_payload
      "#{host}#{user_certificates_path(user_id: user.id)}"
    end

    def host
      ENV['HOST']
    end
end
