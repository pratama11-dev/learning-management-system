# == Schema Information
#
# Table name: exam_questions
#
#  id         :uuid             not null, primary key
#  archive    :boolean
#  category   :string
#  note       :text
#  quest      :text
#  updated_by :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class Exam::QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
