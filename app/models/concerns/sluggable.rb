# frozen_string_literal: true

module Sluggable
  extend ActiveSupport::Concern
  included do
    before_save :generate_slug
  end

  def generate_slug
    self.slug = title.parameterize
  end
end
