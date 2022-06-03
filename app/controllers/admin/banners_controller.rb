# frozen_string_literal: true

module Admin
  class BannersController < AdminController
    def index
      @banners = Banner.all
    end    

    def create
      resource_new_banner = Course.find_by_id(params[:resource_id])
      if resource_new_banner.blank?
        resource_new_banner = Talk.find_by_id(params[:resource_id])
      end
      if resource_new_banner.blank?
        resource_new_banner = Lesson.find_by_id(params[:resource_id])
      end
      
      if resource_new_banner.present?
        new_banner = Banner.new(
          resource_id: resource_new_banner.id,
          resource_type: resource_new_banner.class.name,
        )
        new_banner.save!
        return redirect_to admin_banners_path, notice: 'Banner berhasil ditambahkan'
      end

      return redirect_to admin_banners_path, danger: 'Banner gagal ditambahkan, resource tidak ditemukan.'
    end

    def destroy
      banner = Banner.where(id: params[:id]).first
      if banner.present?
        banner.destroy
        return redirect_to admin_banners_path, notice: 'Banner berhasil dihapus'
      end

      return redirect_to admin_banners_path, danger: 'Banner gagal dihapus'
    end
  end
end
