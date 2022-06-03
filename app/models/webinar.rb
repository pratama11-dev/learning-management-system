# frozen_string_literal: true

# == Schema Information
#
# Table name: webinars
#
#  id                         :uuid             not null, primary key
#  capacity                   :integer
#  certificate_claim_duration :integer
#  date                       :datetime
#  description                :string
#  duration                   :integer
#  is_active                  :boolean          default(TRUE)
#  slug                       :string
#  speaker                    :string
#  tag                        :string           default([]), is an Array
#  theme                      :string
#  title                      :string
#  url                        :string
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#
class Webinar < ApplicationRecord
  include PgSearch::Model
  include Webinars::Helpers
  include CertificateClaimable
  include Sluggable

  validates :theme, :date, :certificate_claim_duration,
    :presence => {:message => "kosong, harus diisi!"}

  validates :duration, :capacity, presence: true, 
            numericality: { greater_than: 0 }

  validates :url, presence: true, format:
    { with: %r{https?://}, message: 'harap gunakan valid URL' }

  validates :title, :slug, uniqueness: true

  has_many :user_webinars, dependent: :destroy
  has_many :users, through: :user_webinars
  has_one_attached :banner_image
  has_many_attached :speaker_avatars

  pg_search_scope :search,
    against: :title,
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }

  def self.cooming_soons
    where("tag &&  ?", "{coming_soon}")
  end

  def self.dones
    where("DATE(date) < ?", DateTime.now)
  end
end
