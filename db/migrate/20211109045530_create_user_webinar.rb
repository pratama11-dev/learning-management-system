class CreateUserWebinar < ActiveRecord::Migration[6.1]
  def change
    create_table :user_webinars, id: :uuid do |t|

      t.references :user, foreign_key: true, type: :uuid
      t.references :webinar, foreign_key: true, type: :uuid
      t.string :status, default: "joined"
      t.timestamps
    end
  end
end
