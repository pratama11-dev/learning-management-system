# == Schema Information
#
# Table name: exam_packages
#
#  id            :uuid             not null, primary key
#  duration      :string
#  is_active     :boolean
#  resource_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :string
#
require "test_helper"

class Exam::PackageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
