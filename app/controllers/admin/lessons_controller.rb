# frozen_string_literal: true

module Admin
  class LessonsController < AdminController
    def index
      @lessons = Lesson.all
    end

    def show
      @lesson = Lesson.find_by(id: params[:id])

      @user_ratings = UserRating.all
    end

    def create
      new_lesson = Lesson.new(lesson_params)

      if new_lesson.save
        set_video(new_lesson)
        return redirect_to admin_lesson_path(new_lesson), notice: 'lesson berhasil di tambah'
      end
      redirect_to admin_lessons_path, alert: "lesson gagal di simpan, #{new_lesson.errors.full_messages}"
    end

    def update
      lesson.assign_attributes(lesson_params)
      if lesson.save
        set_video(lesson)
        return redirect_to admin_lesson_path(lesson), notice: 'lesson berhasil di update'
      end
      redirect_to admin_lessons_path, alert: "lesson gagal di update, #{lesson.errors.full_messages}"
    end

    def destroy
      if lesson.present?
        lesson.destroy
        lesson.video.destroy if lesson.video.present?
      end

      redirect_to admin_lessons_path, notice: 'lesson berhasil di hapus'
    end

    def select_quiz
      @lesson = Lesson.find_by_id(params[:lesson_id])
      @question_categories = Exam::Question.select(:category).pluck(:category).uniq
      @selected_questions = Exam::Question.where(category: params[:category_question]).order(created_at: :asc)
    end

    def add_quiz
      @lesson = Lesson.find_by_id(params[:lesson_id])
      @selected_questions = Exam::Question.where(id: params[:question_ids])

      @exam_package = Exam::Package.find_or_initialize_by(
        resource: @lesson,
        is_active: true
      )
      @exam_package.save if @exam_package.new_record?

      @exam_package.exam_questions = @selected_questions
      @exam_package.save!
      @exam_package.exam_user_package_variant_results.destroy_all

      redirect_to admin_lesson_path(@lesson), notice: 'quiz berhasil di tambah'
    end

    private
    def lesson_params
      if params[:lesson].present?
        return params.require(:lesson).permit(:id, :name, :description, :curriculum_id, :category_name, :banner_image, :learning_name, :is_free)
      end
      params.permit(:id, :name, :description, :curriculum_id, :category_name, :banner_image, :learning_name, :is_free)
    end

    def lesson
      @lesson ||= Lesson.find_by(id: lesson_params[:id])
    end

    def set_video(lesson)
      lesson.video.destroy if lesson.video.present?

      video = Video.find_by(id: params[:video_id])
      new_video = video.dup
      new_video.resource_id = lesson.id
      new_video.resource_class = 'Lesson'
      new_video.file.attach(video.file.blob)
      new_video.save
    end
  end
end
