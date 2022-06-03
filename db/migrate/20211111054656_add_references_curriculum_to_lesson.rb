class AddReferencesCurriculumToLesson < ActiveRecord::Migration[6.1]
  def change
    add_reference :lessons, :curriculum, foreign_key: true, type: :uuid
    remove_reference :lessons, :course, foreign_key: true, type: :uuid
  end
end
