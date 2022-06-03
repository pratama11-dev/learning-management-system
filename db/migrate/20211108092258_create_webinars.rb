class CreateWebinars < ActiveRecord::Migration[6.1]
  def change
    create_table :webinars, id: :uuid do |t|

      t.string :title
      t.string :description
      t.string :url
      t.string :slug
      t.string :speaker
      t.integer :capacity
      t.integer :duration
      t.boolean :is_active, default: true
      t.string :theme
      t.datetime :date
      t.string :tag, array: true, default: []
      t.timestamps
    end
  end
end
