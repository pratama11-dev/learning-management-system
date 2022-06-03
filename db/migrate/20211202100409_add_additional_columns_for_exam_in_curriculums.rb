class AddAdditionalColumnsForExamInCurriculums < ActiveRecord::Migration[6.1]
  def change
    add_column :curriculums, :exam_time, :integer
    add_column :curriculums, :exam_minimum_score, :float    
  end
end
