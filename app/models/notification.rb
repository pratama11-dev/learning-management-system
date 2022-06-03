# == Schema Information
#
# Table name: notifications
#
#  id         :uuid             not null, primary key
#  content    :text
#  is_read    :boolean          default(FALSE)
#  title      :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_notifications_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Notification < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :user

  def send_email
    NotificationWorker.perform_async(
      self.id
    )
  end

  def send_email_at(time_at)
    NotificationWorker.perform_at(
      time_at,
      self.id
    )
  end

  def self.unread
    where(is_read: false)
  end
end
