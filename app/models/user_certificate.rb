# frozen_string_literal: true

# == Schema Information
#
# Table name: user_certificates
#
#  id                 :uuid             not null, primary key
#  base_resource_type :string           not null
#  resource_type      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  base_resource_id   :uuid             not null
#  resource_id        :uuid             not null
#  user_id            :uuid             not null
#
# Indexes
#
#  index_user_certificates_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class UserCertificate < ApplicationRecord
  include Sourceable
  include UserCertificates::Helpers

  belongs_to :user
  belongs_to :base_resource, polymorphic: true
  belongs_to :resource, polymorphic: true
end
