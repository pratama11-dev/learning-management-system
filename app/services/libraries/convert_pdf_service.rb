
# frozen_string_literal: true
require "kristin/version"
require 'open-uri'
require "net/http"
require "spoon"

module Libraries
  class ConvertPdfService
    include Rails.application.routes.url_helpers

    def initialize library
      set_host

      @library = library
      return false if @library.id.blank?
      system 'mkdir', '-p', 'public/html_pdf'
      @file_path_name = "public/html_pdf/#{@library.id}.html"
      @file_path_storage = url_for(@library.file)
      @file_path_storage = ActiveStorage::Blob.service.send(:path_for, @library.file.key) if Rails.env == "development"
      @html_file = ""
      @error_messages = []
    end
    
    def run
      if @library.content_html.present?
        return @html_file = @library.content_html
      end

      ConvertPdfWorker.perform_async(@library.id)
      @error_messages << "File Not Ready to view, Tell admin to process the file."
    end

    def start_convert
      kristine_service = ::Libraries::KristineService.new(@file_path_storage, @file_path_name, {})
      kristine_service.convert
      if File.exist?(@file_path_name)
        @library.content_html.attach(io: File.open(@file_path_name), filename: "#{@library.id}.html")
        puts "============= File Suscessfully Uploaded =================="
      else
        puts "============= File failed to Uploaded =================="
      end
    end

    def html_file
      @html_file
    end

    def error_messages
      @error_messages
    end

    def set_host
      Rails.application.default_url_options = Rails.application.config.action_mailer.default_url_options
    end
  end
end
