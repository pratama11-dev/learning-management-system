# frozen_string_literal: true

module Helpers
  extend ActiveSupport::Concern
  def option_for_video
    Video
      .where(
        resource_class: nil,
        resource_id: nil
      )
      .map { |video| ["#{video.name} - #{video.description}", video.id] }
  end

  def bookmarked_by(current_user)
    UserBookmark
      .where(
        resource_type: self.class,
        resource_id: id,
        user_id: current_user.id
      ).first.present?
  end

  def liked_by(current_user)
    UserLike
      .where(
        resource_type: self.class,
        resource_id: id,
        user_id: current_user.id,
        likes: true
      ).first.present?
  end

  def disliked_by(current_user)
    UserLike
      .where(
        resource_type: self.class,
        resource_id: id,
        user_id: current_user.id,
        likes: false
      ).first.present?
  end

  def total_feedback
    negative_feedback = UserLike
                        .where(
                          resource_type: self.class,
                          resource_id: id,
                          likes: false
                        ).count
    positive_feedback = UserLike
                        .where(
                          resource_type: self.class,
                          resource_id: id,
                          likes: true
                        ).count
    {
      like: positive_feedback.to_s,
      dislike: negative_feedback.to_s
    }
  end
end
