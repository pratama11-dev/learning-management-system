# frozen_string_literal: true

class UserLike
  include Mongoid::Document
  include Mongoid::Timestamps
  include Sourceable

  field :user_id, type: String
  field :resource_id, type: String
  field :resource_type, type: String
  field :likes, type: Boolean
end
