class RemedialNotificationJob < ApplicationJob
  queue_as :default
  def perform
    remedials = Exam::UserPackageVariantResult.where('DATE(remedial_exam_at) = ?', Date.today+1)
    remedials.each do |remedial|
      new_notification = Notification.new(
        user_id: remedial.user_id,
        title: "Remedial untuk #{remedial.exam_package.resource.name} akan dimulai pada #{remedial.remedial_exam_at.localtime.strftime('%d %B %Y - %H:%M')}",
        content: "Jadwal Remedial untuk #{remedial.exam_package.resource.name} Akan dimulai pada #{remedial.remedial_exam_at.localtime.strftime('%d %B %Y - %H:%M')}",
        url: ENV["HOST"]
      )

      new_notification.save!
      new_notification.send_email_at(remedial.remedial_exam_at.localtime + 1.day)
    end
  end
end
