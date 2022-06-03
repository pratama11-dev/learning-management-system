# frozen_string_literal: true

class LibrariesController < ApplicationController
  layout 'homes'
  def index
    @libraries = Library.all
  end

  def show
    @library = Library.find_by(id: params[:id])
    if @library.blank? || @library.file.blank?
      return redirect_to libraries_path, 
        alert: t("dashboard_user.File Not found")
    end

    if @library.file.content_type != "application/pdf"
      return redirect_to url_for(@library.file) if @library.file.present?

      return redirect_to libraries_path, 
        alert: "File #{@library.file.content_type} not supported to preview"
    end

    @covert_pdf_service = ::Libraries::ConvertPdfService.new(@library)
    @covert_pdf_service.run

    if @covert_pdf_service.error_messages.present?
      if current_user.is_admin? || current_user.is_super_admin?
        return redirect_to admin_libraries_path, 
          alert: @covert_pdf_service.error_messages.to_sentence 
      end

      if @library.resources?
        return redirect_to course_path(
          id: @library.resource.lesson.course.id, tab: 2, lesson_id: @library.resource.lesson.id 
        ), alert: @covert_pdf_service.error_messages.to_sentence 
      end

      return redirect_to libraries_path, alert: @covert_pdf_service.error_messages.to_sentence
    end

    @html_file = url_for(@covert_pdf_service.html_file)
    render layout: 'library'
  end
end
