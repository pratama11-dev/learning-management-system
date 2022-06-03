# == Schema Information
#
# Table name: exam_user_package_variant_results
#
#  id               :uuid             not null, primary key
#  code             :string
#  end_exam_at      :datetime
#  group            :string
#  remedial_exam_at :datetime
#  result           :string
#  start_exam_at    :datetime
#  submit_exam_at   :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  exam_package_id  :uuid             not null
#  user_id          :uuid
#
# Indexes
#
#  index_exam_user_package_variant_results_on_exam_package_id  (exam_package_id)
#
# Foreign Keys
#
#  fk_rails_...  (exam_package_id => exam_packages.id)
#
require "test_helper"

class Exam::UserPackageVariantResultTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
