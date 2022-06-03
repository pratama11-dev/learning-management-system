class CreateExamQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :exam_questions, id: :uuid do |t|
      t.text :quest
      t.text :note
      t.string :category
      t.boolean :archive

      t.timestamps
    end
  end
end
