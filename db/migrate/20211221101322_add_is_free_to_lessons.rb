class AddIsFreeToLessons < ActiveRecord::Migration[6.1]
  def change
    add_column :lessons, :is_free, :boolean, default: true
  end
end
