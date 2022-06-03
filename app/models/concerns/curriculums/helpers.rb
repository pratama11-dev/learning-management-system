# frozen_string_literal: true

module Curriculums
  module Helpers
    extend ActiveSupport::Concern

    def package
      Exam::Package.find_or_create_by(
        resource_type: "Curriculum", 
        resource_id: id, 
        is_active: true
      )
    end

    def total_question
      package.exam_questions.count
    end
    
    def ticket_for(current_user_id)
      package.exam_user_package_variant_results.find_or_initialize_by(
        user_id: current_user_id
      )
    end

    def progress(user)
      progress = 0
      progress_raw = self.lessons.map {|lesson| lesson.progress(user)}
      progress = progress_raw.sum / progress_raw.count if progress_raw.count > 0
      return progress.round(2)
    end
    
    def exam_user_package_variant_results(user)
      return [] if user.blank?
      package.exam_user_package_variant_results.where(user_id: user.id).order(created_at: :desc)
    end

    def exam_user_package_variant_result(user)
      return [] if user.blank?
      self.exam_user_package_variant_results(user).max(1) {|x,y| x.score <=> y.score}&.first
    end

    def complete?(user)
      if (progress(user) > 99)
        return self.exam_user_package_variant_result(user).complete?.present?
      end
      false
    end

    def video
      return nil if self.lessons.blank?
      lessons.first.video
    end
  end
end
