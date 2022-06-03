# frozen_string_literal: true

# == Schema Information
#
# Table name: videos
#
#  id               :uuid             not null, primary key
#  name             :string
#  description      :text
#  resource_id      :string
#  resource_class   :string
#  source_video_id  :string
#  source_video_url :string
#  thumbnails       :string
#  thumbnail        :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  timestamps       :string
#
class Video < ApplicationRecord
  include PgSearch::Model
  include Videos::Helpers

  has_one_attached :file
  validates :file, presence: true

  enum resource_class: {
    Talk: 'Talk',
    Lesson: 'Lessons'
  }

  pg_search_scope :search,
    against: :name,
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }
end
