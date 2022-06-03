class CreateLessons < ActiveRecord::Migration[6.1]
  def change
    create_table :lessons, id: :uuid do |t|
      t.string :name
      t.text :description
      t.references :course, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
