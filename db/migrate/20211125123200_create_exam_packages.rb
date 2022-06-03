class CreateExamPackages < ActiveRecord::Migration[6.1]
  def change
    create_table :exam_packages, id: :uuid do |t|
      t.string :resource_id
      t.string :resource_type
      t.string :duration
      t.boolean :is_active

      t.timestamps
    end
  end
end
