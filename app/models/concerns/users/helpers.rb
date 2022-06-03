# frozen_string_literal: true

module Users
  module Helpers
    extend ActiveSupport::Concern
    def formatted_phone
      return '' if phone_number.blank?

      formatted_phone = phone_number.clone
      if phone_number.first == '0'
        formatted_phone[0] = '2'
        formatted_phone.insert 0, '6'
        formatted_phone.insert 0, '+'
        return formatted_phone
      end

      if phone_number.first(2) == '62'
        formatted_phone.insert 0, '+'
        return formatted_phone
      end

      formatted_phone
    end

    def age
      (Time.now.to_s(:number).to_i - birthday.to_time.to_s(:number).to_i) / 10e9.to_i
    end

    def bookmarks
      UserBookmark.where(user_id: id)
    end

    def code
      self.id.gsub(/[^0-9]/, '').last(7)
    end
  end
end
