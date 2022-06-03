class CreateUserLessons < ActiveRecord::Migration[6.1]
  def change
    create_table :user_lessons, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :lesson, null: false, foreign_key: true, type: :uuid
      t.string :phase

      t.timestamps
    end
  end
end
