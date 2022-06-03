class CreateCurriculums < ActiveRecord::Migration[6.1]
  def change
    create_table :curriculums, id: :uuid do |t|
      t.references :course, null: false, foreign_key: true, type: :uuid
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
