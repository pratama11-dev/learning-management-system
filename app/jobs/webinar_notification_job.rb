class WebinarNotificationJob < ApplicationJob
  queue_as :default
  def perform
    webinars = Webinar.where('DATE(date) = ?', Date.today)
    webinars.each do |webinar|
      webinar.user_webinars.each do |user_webinar|
        new_notification = Notification.new(
          user_id: user_webinar.user_id,
          title: "Live Online class untuk #{webinar.title} Akan dimulai",
          content: "Jadwal live online classes untuk #{webinar.title} Akan dimulai pada #{webinar.date.localtime.strftime('%d %B %Y - %H:%M')}",
          url: webinar.url
        )

        new_notification.save!
        new_notification.send_email_at(webinar.date.localtime - 2.hours)
      end
    end
  end
end
