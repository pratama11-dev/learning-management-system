# frozen_string_literal: true

# == Schema Information
#
# Table name: lessons
#
#  id            :uuid             not null, primary key
#  category_name :string
#  description   :text
#  is_free       :boolean          default(TRUE)
#  learning_name :string
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  curriculum_id :uuid
#
# Indexes
#
#  index_lessons_on_curriculum_id  (curriculum_id)
#
# Foreign Keys
#
#  fk_rails_...  (curriculum_id => curriculums.id)
#
class Lesson < ApplicationRecord
  include PgSearch::Model

  include Helpers
  include Lessons::Helpers
  belongs_to :curriculum
  has_many :user_lessons, dependent: :destroy
  has_many :users, through: :user_lessons

  has_one_attached :banner_image

  pg_search_scope :search,
    against: %i[category_name name],
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }
  default_scope { order(created_at: :asc) }

  def self.trendings
    joins(:user_lessons).group(:id).order('count(user_lessons.id) DESC')
  end

  def certificate_claimable?
    true
  end
end
