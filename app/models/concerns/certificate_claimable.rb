# frozen_string_literal: true

module CertificateClaimable
  extend ActiveSupport::Concern

  def certificate_claimable?
    return true if try(:certificate_claim_duration).blank?
    return false if Date.today > date + certificate_claim_duration.days
    return true if Date.today <= date + certificate_claim_duration.days
  end
end
