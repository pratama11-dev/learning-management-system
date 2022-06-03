# frozen_string_literal: true

module Admin
  class AutoCoursesController < AdminController
    def index
      @auto_courses = AutoCourse.all
      @new_auto_course = AutoCourse.new
    end    

    def create
      @auto_course_service = AutoCourses::CreateService.new(
        params[:lesson_id],
        params[:users]
      )

      if @auto_course_service.run
        return redirect_to admin_auto_courses_path, notice: 'Auto course was successfully created.'
      end

      redirect_to admin_auto_courses_path, alert: @auto_course_service.full_error_messages
    end

    def destroy
      @auto_course = AutoCourse.find(params[:id])
      if @auto_course.destroy
        return redirect_to admin_auto_courses_path, notice: 'Auto course was successfully destroyed.'
      end
      
      redirect_to admin_auto_courses_path, alert: @auto_course.full_error_messages
    end

    def download_auto_courses
      @lessons = Lesson.all

      respond_to do |format|
        format.xlsx {
          response.headers['Content-Disposition'] = 'attachment; filename="data_input_course.xlsx"'
        }
      end
    end

    def upload_auto_courses
      @auto_course_service = AutoCourses::ImportService.new(
        params[:auto_course][:file]
      )

      if @auto_course_service.run
        return redirect_to admin_auto_courses_path, notice: 'Auto course was successfully created.'
      end

      redirect_to admin_auto_courses_path, alert: @auto_course_service.full_error_messages
    end
  end
end
