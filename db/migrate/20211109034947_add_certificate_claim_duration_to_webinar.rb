class AddCertificateClaimDurationToWebinar < ActiveRecord::Migration[6.1]
  def change
    add_column :webinars, :certificate_claim_duration, :integer
  end
end
