module Admin
  class LibrariesController < AdminController

    def index
      @library = Library.new
      @libraries = Library.all
    end
    
    def show
      @library = Library.find_by(id: params[:id])

      if @library.blank? || @library.file.blank?
        return redirect_to admin_libraries_path, 
          alert: "File Not found"
      end

      if @library.file.content_type != "application/pdf"
        return redirect_to admin_libraries_path, 
          alert: "File #{@library.file.content_type} not supported to preview" 
      end

      @covert_pdf_service = ::Libraries::ConvertPdfService.new(@library)
      @covert_pdf_service.run

      if @covert_pdf_service.error_messages.present?
        return redirect_to admin_libraries_path, 
          alert: @covert_pdf_service.error_messages.to_sentence
      end

      @html_file = url_for(@covert_pdf_service.html_file)

      render layout: 'library'
    end

    def edit
      @library = Library.find_by_id params[:id]
    end

    def create
      @library = Library.new(library_params)
      if @library.file.present?
        @library.name = @library.file.filename

        if @library.save
          @covert_pdf_service = ::Libraries::ConvertPdfService.new(@library)
          @covert_pdf_service.run
          return redirect_to admin_libraries_path, notice: "File Successfully Uploaded."
        end
      end

      redirect_to admin_libraries_path, alert: @library.errors.full_messages.to_sentence
    end

    def update
      @library = Library.find_by_id(params[:id])
      @library.name = library_params[:name]
      @library.cover = library_params[:cover] if library_params[:cover].present?
      @library.content_html = library_params[:content_html] if library_params[:content_html].present?
      
      if @library.save
        return redirect_to admin_libraries_path, notice: "File Successfully Updated."
      end

      return redirect_to admin_libraries_path, alert: @library.errors.full_messages.to_sentence
    end

    def destroy
      @library = Library.find_by_id params[:id]
      @library.destroy if @library.present?

      redirect_to admin_libraries_path, notice: "File Successfully deleted."
    end


    private
    def library_params
      params.require(:library).permit(:file, :category, :name, :cover, :content_html)
    end
  end
end
