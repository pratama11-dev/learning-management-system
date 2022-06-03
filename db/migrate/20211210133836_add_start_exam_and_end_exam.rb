class AddStartExamAndEndExam < ActiveRecord::Migration[6.1]
  def change
    add_column :exam_user_package_variant_results, :start_exam_at, :datetime
    add_column :exam_user_package_variant_results, :end_exam_at, :datetime
    add_column :exam_user_package_variant_results, :submit_exam_at, :datetime
  end
end
