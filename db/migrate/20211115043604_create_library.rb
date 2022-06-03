class CreateLibrary < ActiveRecord::Migration[6.1]
  def change
    create_table :libraries, id: :uuid do |t|

      t.string :name, null: false
      t.boolean :is_private, null: false, default: false
      t.string :category
      t.timestamps
    end
  end
end
