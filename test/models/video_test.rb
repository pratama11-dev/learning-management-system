# frozen_string_literal: true

# == Schema Information
#
# Table name: videos
#
#  id               :uuid             not null, primary key
#  name             :string
#  description      :text
#  resource_id      :string
#  resource_class   :string
#  source_video_id  :string
#  source_video_url :string
#  thumbnails       :string
#  thumbnail        :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  timestamps       :string
#
require 'test_helper'

class VideoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
