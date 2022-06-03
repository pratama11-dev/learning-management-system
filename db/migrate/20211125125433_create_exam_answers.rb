class CreateExamAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :exam_answers, id: :uuid do |t|
      t.references :exam_question, null: false, foreign_key: true, type: :uuid
      t.string :answer
      t.boolean :is_correct

      t.timestamps
    end
  end
end
