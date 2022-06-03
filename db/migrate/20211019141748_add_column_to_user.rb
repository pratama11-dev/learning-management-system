class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string
    add_column :users, :name, :string
    add_column :users, :phone_number, :string
    add_column :users, :birthday, :date
    add_column :users, :address, :text
    add_column :users, :city, :string
    add_column :users, :gender, :string
    add_column :users, :position, :string
    add_column :users, :company, :string
    add_column :users, :company_address, :string
    add_column :users, :last_education, :string
    add_column :users, :business_field, :string
    add_column :users, :is_confirmed, :string
    add_column :users, :subscription, :string
    add_column :users, :type_account, :string
    add_column :users, :subscribe_date, :datetime
  end
end
