# frozen_string_literal: true

module Sourceable
  extend ActiveSupport::Concern
  def source
    eval(resource_type).find_by(id: resource_id)
  end

  def base_source
    eval(base_resource_type).find_by(id: base_resource_id)
  end
end
