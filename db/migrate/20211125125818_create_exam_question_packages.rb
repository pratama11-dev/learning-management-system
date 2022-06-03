class CreateExamQuestionPackages < ActiveRecord::Migration[6.1]
  def change
    create_table :exam_question_packages, id: :uuid do |t|
      t.references :exam_package, null: false, foreign_key: true, type: :uuid
      t.references :exam_question, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
