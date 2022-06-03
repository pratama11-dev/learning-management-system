class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.string :title
      t.text :content
      t.references :user, null: false, type: :uuid, foreign_key: true
      t.boolean :is_read, default: false
      t.string :url
      t.timestamps
    end
  end
end
