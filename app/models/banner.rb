# frozen_string_literal: true

class Banner
  include Mongoid::Document
  include Mongoid::Timestamps
  include Sourceable

  field :resource_id, type: String
  field :resource_type, type: String
  field :banner_type, type: String
  
end
