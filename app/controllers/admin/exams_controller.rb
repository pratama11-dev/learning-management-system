# frozen_string_literal: true

module Admin
  class ExamsController < AdminController
    def index
      @new_question = Exam::Question.new

      @questions = Exam::Question.all
      @grouped_questions = @questions.group_by {|question| [question.category]}
      @list_category_questions = []

      index = 0
      @grouped_questions.each do |key, questions|
        total_answer =  questions.map {|question| question.exam_answers.size}.sum
        last_edit = questions.sort_by {|question| question.updated_at}.pluck(:updated_at).last

        @list_category_questions << {
          index: (index += 1),
          category: key.to_sentence,
          total_question: questions.size,
          total_answer: total_answer,
          last_edit: last_edit
        }
      end
    end

    def new
      @question = Exam::Question.find_by(category: params[:category])
      @new_question = Exam::Question.new

      if @question.present?
        @new_question = Exam::Question.new({
          category: params[:category]
        })
      end
    end
    
    def show
      @questions = Exam::Question.where(category: params[:id]).order(created_at: :asc)
    end

    def edit
      @question = Exam::Question.find(params[:id])
    end

    def create
      ActiveRecord::Base.transaction do
        @question = Exam::Question.new(exam_question_params)
        @question.save!

        answer_lists.each do |answer|
          new_exam_answer = @question.exam_answers.new({
            answer: answer[:answer],
            is_correct: answer[:correct].present?
          })

          new_exam_answer.save!
        end

        redirect_to admin_exams_path, notice: "Question successfully created"
      end
    rescue => e
      redirect_to admin_exams_path, alert: e
    end

    def update
      ActiveRecord::Base.transaction do
        @question = Exam::Question.find_by_id(params[:id])
        @question.assign_attributes(exam_question_params)
        @question.updated_by = "#{current_user.name} (#{current_user.email})"
        
        deleted_answer = @question.exam_answers.where.not(id: answer_lists.pluck(:id))
        deleted_answer.destroy_all

        answer_lists.each do |answer|
          updated_answer = @question.exam_answers.find_or_initialize_by(id: answer[:id])

          updated_answer.assign_attributes({
            answer: answer[:answer],
            is_correct: answer[:correct].present?
          })  

          updated_answer.save!
        end

        if @question.save!
          return redirect_to admin_exam_path(id: @question.category), notice: "Soal Telah berhasil di perbaharui"
        end
      end

    rescue => e
      return redirect_to admin_exam_path(id: @question.category), alert: e
    end

    def destroy
      @question = Exam::Question.find(params[:id])
      @question.destroy

      redirect_to admin_exams_path, notice: "Question successfully deleted"
    end

    def destroy_exam_category
      category = params[:category_name]
      questions = Exam::Question.where(category: category)
      questions.destroy_all

      redirect_to admin_exams_path, notice: "Question sucessfully deleted."
    end

    def download_exam_template
      if params[:bank]
        return send_file("#{Rails.root}/public/template_bank_exam_taxsam.xlsx")
      end
  
      send_file("#{Rails.root}/public/template_exam_taxsam.xlsx")
    end

    def upload_exam
      redirect_to admin_exams_path, notice: "function not yet applied"
    end

    private
    def exam_question_params
      params.require(:exam_question).permit(:id, :quest, :note, :category)
    end

    def answer_lists
      params[:answers]&.values || []
    end
  end
end
