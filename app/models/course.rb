# frozen_string_literal: true

# == Schema Information
#
# Table name: courses
#
#  id          :uuid             not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Course < ApplicationRecord
  include PgSearch::Model

  has_many :curriculums, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :users, through: :user_courses

  has_one_attached :banner_image

  pg_search_scope :search,
    against: :name,
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }
    
  def certificate_claimable?
    true
  end
end
