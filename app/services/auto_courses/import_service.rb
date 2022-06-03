# frozen_string_literal: true

module AutoCourses
  class ImportService < ::BaseService
    def initialize(file)
      @file = file
    end

    def action      
      roo_excel_file = Roo::Spreadsheet.open(@file)
      ActiveRecord::Base.transaction do
        roo_excel_file.sheet(0).each_with_index do |cell, index|
          next if index == 0
          @cell = cell
          user = User.find_by(email: cell[2])
          lesson = Lesson.find_by(name: cell[1])
          user_lesson = user.user_lessons.find_or_initialize_by(lesson: lesson)
          user_lesson.phase = "quiz"
          user_lesson.save!

          if user_lesson.user_lesson_timestamp.present?
            user_lesson_timestamp = user_lesson.user_lesson_timestamp.first
          else
            user_lesson_timestamp = UserLessonsTimestamp.new(
              user_id: user.id, 
              lesson_id: lesson.id, 
              user_lesson_id: user_lesson.id
            )
          end

          user_lesson_timestamp.timestamp =  2.hours.to_s
          user_lesson_timestamp.max_timestamp = 2.hours.to_s
          user_lesson_timestamp.save!
  
          auto_course = AutoCourse.find_or_initialize_by(
            lesson_id: lesson.id,
            user_id: user.id,
            user_lesson_id: user_lesson.id, 
            user_lesson_timestamp_id: user_lesson_timestamp.id
          )
          auto_course.save!          
        end
      end
    rescue => e
      @error_messages << e
      @error_messages << "Untuk Baris >> #{@cell.join(' | ')}"
    end    
  end
end
