class AddRemedialTimeToExamResult < ActiveRecord::Migration[6.1]
  def change
    add_column :exam_user_package_variant_results, :remedial_exam_at, :datetime
  end
end
