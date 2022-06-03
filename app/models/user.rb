# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                 :uuid             not null, primary key
#  address            :text
#  birthday           :date
#  business_field     :string
#  city               :string
#  city_company       :string
#  company            :string
#  company_address    :string
#  confirmation_token :string(128)
#  districts_company  :string
#  email              :string           not null
#  encrypted_password :string(128)      not null
#  full_name          :string
#  gender             :string
#  is_confirmed       :string
#  kk_number          :string
#  last_education     :string
#  name               :string
#  nik                :string
#  phone_number       :string
#  position           :string
#  province           :string
#  remember_token     :string(128)      not null
#  rt                 :string
#  rw                 :string
#  subscribe_date     :datetime
#  subscription       :string
#  type_account       :string
#  username           :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email           (email)
#  index_users_on_remember_token  (remember_token)
#
class User < ApplicationRecord
  include PgSearch::Model
  rolify
  include Users::Helpers
  include Clearance::User
  has_one_attached :avatar

  has_many :user_webinars, dependent: :destroy
  has_many :webinars, through: :user_webinars

  has_many :user_lessons, dependent: :destroy
  has_many :lessons, through: :user_lessons

  has_many :user_courses, dependent: :destroy
  has_many :courses, through: :user_courses

  has_many :user_certificates, dependent: :destroy
  has_many :notifications, dependent: :destroy
  
  enum subscription: {
    subscribe: 'subscribe',
    unsubscribe: 'unsubscribe'
  }
  
  pg_search_scope :search,
    against: :name,
    using: {
      tsearch: { prefix: true, any_word: true, negation: true }
    }
end
