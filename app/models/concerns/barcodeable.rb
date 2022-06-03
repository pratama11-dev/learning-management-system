require 'barby'
require 'barby/barcode/qr_code'
require 'barby/outputter/svg_outputter'
require 'barby/outputter/png_outputter'

module Barcodeable extend ActiveSupport::Concern
  included do
    helper_method :barcode_svg
    helper_method :barcode_png
  end

  def barcode_svg
    @barcode_svg ||= Barby::QrCode.new(barcode_payload)
      .to_svg
      .html_safe
  end

  def barcode_png
    return @barcode_png if @barcode_png.present?

    barcode = Barby::QrCode.new(barcode_payload)
    blob = Barby::PngOutputter.new(barcode).to_png
    encoded_image = Base64.strict_encode64 blob
    base64_image = "data:image/png;base64,#{encoded_image}"
    @barcode_png = base64_image
  end
end