class AddTimestampToVideos < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :timestamps, :string
  end
end
