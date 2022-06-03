# frozen_string_literal: true

class UserBookmark
  include Mongoid::Document
  include Mongoid::Timestamps
  include Sourceable

  field :user_id, type: String
  field :resource_id, type: String
  field :resource_type, type: String

  def resource
    eval(self.resource_type).find(self.resource_id)
  end
end
