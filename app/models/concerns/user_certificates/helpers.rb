
# frozen_string_literal: true

module UserCertificates
  module Helpers
    extend ActiveSupport::Concern

    def code_generator
      if self.base_resource_type == "Curriculum"
        return "#{generate_nik}/TAXSAM.EX.#{RomanNumerals.to_roman(created_at.month.to_i)}/#{created_at.year}" 
      end

      if self.base_resource_type == "Webinar"
        return "#{generate_nik}/TAXSAM.SS.#{RomanNumerals.to_roman(created_at.month.to_i)}/#{created_at.year}"
      end
    
      if self.base_resource_type == "Course"
        return "#{generate_nik}/TAXSAM.BR.#{RomanNumerals.to_roman(created_at.month.to_i)}/#{created_at.year}"
      end
    end
    
    def generate_nik
      "TLC-#{self.user.code}"
    end
  end
end