# frozen_string_literal: true

module Admin
  class CurriculumsController < AdminController
    def show
      @curriculum = Curriculum.find_by(id: params[:id])
      @questions = @curriculum.package.exam_questions
    end

    def create
    end

    def destroy
      curriculum = Curriculum.find_by(id: params[:id])
      if curriculum.present?
        course_id = curriculum.course_id
        curriculum.destroy
      end

      redirect_to admin_course_path(course_id), notice: 'Curriculum berhasil di hapus'
    end

    def select_questions
      @curriculum = Curriculum.find_by_id(params[:curriculum_id])
      @question_categories = Exam::Question.select(:category).pluck(:category).uniq
      @selected_questions = Exam::Question.where(category: params[:category_question]).order(created_at: :asc)
    end


    def add_questions
      @curriculum = Curriculum.find_by_id(params[:curriculum_id])
      @selected_questions = Exam::Question.where(id: params[:question_ids])

      @exam_package = Exam::Package.find_or_initialize_by(
        resource: @curriculum,
        is_active: true
      )

      @exam_package.save if @exam_package.new_record?

      @exam_package.exam_questions = @selected_questions
      @exam_package.save!

      redirect_to admin_course_path(@curriculum.course.id), notice: 'Soal berhasil di tambah'
    end

  end
end
