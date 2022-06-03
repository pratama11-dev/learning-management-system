class CreateUserCertificates < ActiveRecord::Migration[6.1]
  def change
    create_table :user_certificates, id: :uuid do |t|
      t.uuid :resource_id, null: false
      t.string :resource_type, null: false

      t.uuid :base_resource_id, null: false
      t.string :base_resource_type, null: false

      t.references :user, type: :uuid, null: false, foreign_key: true
      t.timestamps
    end
  end
end
