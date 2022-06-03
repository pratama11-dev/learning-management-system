# frozen_string_literal: true

# == Schema Information
#
# Table name: user_webinars
#
#  id         :uuid             not null, primary key
#  status     :string           default("joined")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid
#  webinar_id :uuid
#
# Indexes
#
#  index_user_webinars_on_user_id     (user_id)
#  index_user_webinars_on_webinar_id  (webinar_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (webinar_id => webinars.id)
#
class UserWebinar < ApplicationRecord
  include UserWebinars::CheckWebinarQuota

  belongs_to :webinar
  belongs_to :user
end
