class AddOrderNumberForTalks < ActiveRecord::Migration[6.1]
  def change
    add_column :talks, :order_number, :integer
  end
end
