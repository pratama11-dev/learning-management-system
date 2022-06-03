class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :videos, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :resource_id
      t.string :resource_class

      t.string :source_video_id
      t.string :source_video_url
      t.string :thumbnails
      t.string :thumbnail
      t.timestamps
    end
  end
end
