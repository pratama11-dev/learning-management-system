# frozen_string_literal: true

module Admin
  class CoursesController < AdminController
    def index
      @courses = Course.all
    end

    def show
      @course = Course.find_by(id: params[:id])

      @user_ratings = UserRating.all
    end

    def create
      ActiveRecord::Base.transaction do
        new_course = Course.new(course_params)
        new_course.save!

        params[:curriculum].each do |cp|
          new_curriculum = new_course.curriculums.new(
            curriculum_params(cp)
          )
          new_curriculum.save!
        end
        return redirect_to admin_course_path(new_course), notice: 'course berhasil di tambah'
      end

      redirect_to admin_courses_path, alert: "course gagal di simpan, #{new_course.errors.full_messages}"
    rescue => e
      redirect_to admin_courses_path, alert: "course gagal di simpan, #{e.message}"
    end

    def update
      ActiveRecord::Base.transaction do
        course.assign_attributes(course_params)
        curriculum_ids = params[:curriculum].pluck(:id).compact
        course.curriculums.where.not(id: curriculum_ids).destroy_all
        course.save!

        params[:curriculum].each do |cp|
          curriculum = course.curriculums.find_by(id: cp[:id])
          curriculum = course.curriculums.new if curriculum.blank?

          curriculum.assign_attributes(curriculum_params(cp))
          curriculum.save!
        end

        return redirect_to admin_course_path(course.id), notice: 'course berhasil di tambah'
      end

      redirect_to admin_courses_path, alert: "course gagal di update, #{course.errors.full_messages}"
    rescue => e
      redirect_to admin_courses_path, alert: "course gagal di simpan, #{e.message}"
    end

    def destroy
      course.destroy if course.present?
      redirect_to admin_courses_path, notice: 'course berhasil di hapus'
    end

    private
    def course_params
      if params[:course].present?
        return params.require(:course).permit(:id, :name, :description, :banner_image)
      end
      params.permit(:id, :name, :description, :banner_image)
    end

    def curriculum_params(cp)
      cp.permit(:id, :name, :description, :exam_time, :exam_minimum_score)
    end

    def course
      @course ||= Course.find_by(id: course_params[:id])
    end
  end
end
