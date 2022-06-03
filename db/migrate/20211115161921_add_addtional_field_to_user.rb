class AddAddtionalFieldToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :full_name, :string
    add_column :users, :nik, :string
    add_column :users, :kk_number, :string
    add_column :users, :rt, :string
    add_column :users, :rw, :string
    add_column :users, :province, :string
    add_column :users, :districts_company, :string
    add_column :users, :city_company, :string
  end
end
