class AddLearningNameToLesson < ActiveRecord::Migration[6.1]
  def change
    add_column :lessons, :learning_name, :string
  end
end
