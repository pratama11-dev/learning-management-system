# frozen_string_literal: true

class UserRating
  include Mongoid::Document
  include Mongoid::Timestamps
  include Sourceable

  field :user_id, type: String
  field :resource_id, type: String
  field :resource_type, type: String
  field :rating, type: String
  field :comment, type: String

  def user
    User.find_by_id(user_id)
  end
end
