class AddCategoryNameToLessons < ActiveRecord::Migration[6.1]
  def change
    add_column :lessons, :category_name, :string
  end
end
