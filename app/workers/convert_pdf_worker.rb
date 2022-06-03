class ConvertPdfWorker
  include Sidekiq::Worker

  def perform(library_id)
    @library = Library.find_by_id library_id
    @covert_pdf_service = ::Libraries::ConvertPdfService.new(@library)
    @covert_pdf_service.start_convert
  end
end