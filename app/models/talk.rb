# frozen_string_literal: true

# == Schema Information
#
# Table name: talks
#
#  id           :uuid             not null, primary key
#  description  :text
#  name         :string
#  order_number :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Talk < ApplicationRecord
  include PgSearch::Model
  include Helpers

  validates :name, presence: true
  validates :order_number, presence: true
  has_one_attached :banner_image

  pg_search_scope :search,
    against: :name,
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }
  default_scope { order(:order_number) }

  def video
    Video.find_by(resource_id: id)
  end
end
