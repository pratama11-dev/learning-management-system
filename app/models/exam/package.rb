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
class Exam::Package < ApplicationRecord
  belongs_to :resource, polymorphic: true
  has_many :question_packages, dependent: :destroy, 
    class_name: 'Exam::QuestionPackage', foreign_key: 'exam_package_id'
    
  has_many :exam_questions, through: :question_packages, 
    class_name: 'Exam::Question', foreign_key: 'exam_question_id'
    
  has_many :exam_user_package_variant_results, dependent: :destroy, 
    class_name: 'Exam::UserPackageVariantResult', foreign_key: 'exam_package_id'
end
