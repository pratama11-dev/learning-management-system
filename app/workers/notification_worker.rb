class NotificationWorker
  include Sidekiq::Worker

  def perform(*notification_id)
    @notification = Notification.find_by_id(notification_id)

    return "Data tidak valid" if @notification.blank?

    mail = Emails::NotificationCourseService.new(notification: @notification)
    mail.action
  end
end