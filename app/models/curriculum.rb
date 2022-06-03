# frozen_string_literal: true

# == Schema Information
#
# Table name: curriculums
#
#  id                 :uuid             not null, primary key
#  description        :text
#  exam_minimum_score :float
#  exam_time          :integer
#  name               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  course_id          :uuid             not null
#
# Indexes
#
#  index_curriculums_on_course_id  (course_id)
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
class Curriculum < ApplicationRecord
  include Helpers
  include CertificateClaimable
  include Curriculums::Helpers

  has_one_attached :banner_image
  default_scope { order(created_at: :asc) }

  belongs_to :course
  has_many :lessons, dependent: :destroy
end
