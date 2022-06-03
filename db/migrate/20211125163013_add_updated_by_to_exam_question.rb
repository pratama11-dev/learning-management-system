class AddUpdatedByToExamQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :exam_questions, :updated_by, :string
  end
end
