# frozen_string_literal: true

namespace :dummy_user do
  desc 'Setup Dummy User'
  task setup: :environment do
    user = User.find_or_initialize_by(email: 'administrator@wellcode.io')
    user.name = 'admin'
    user.full_name = 'admin'
    user.password = 'L%g3?_Rx^)'
    user.subscription = 'subscribe'
    user.is_confirmed = 'active'
    user.username =  'admin'
    user.birthday =  Date.today
    user.gender = '-'
    user.phone_number = '-'
    user.city = '-'
    user.address = '-'
    user.position = '-'
    user.company = '-'
    user.company_address = '-'
    user.last_education =  '-'
    user.business_field =  '-'
    user.save

    user.add_role(:admin) unless user.has_role?(:admin)
  end

  desc '30 dummy users'
  task multipleUsers: :environment do
    30.times do |i|
      user = User.find_or_initialize_by(email: "user#{i}@wellcode.io")
      user.name = Faker::Name.unique.name
      user.password = 'password'
      user.subscription = 'subscribe'
      user.is_confirmed = 'active'
      user.username = "user#{i}"
      user.birthday = Faker::Date.birthday(min_age: 25, max_age: 65)
      user.gender = Faker::Gender.binary_type
      user.phone_number = Faker::PhoneNumber.cell_phone_with_country_code
      user.city = Faker::Address.city
      user.address = Faker::Address.street_address
      user.position = Faker::Company.profession
      user.company = Faker::Company.name
      user.company_address = Faker::Address.street_address
      user.last_education = Faker::Educator.degree
      user.business_field = Faker::Company.industry
      user.save

      user.add_role(:user) unless user.has_role?(:user)
    end
  end
end
