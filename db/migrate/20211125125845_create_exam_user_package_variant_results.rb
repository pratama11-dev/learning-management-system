class CreateExamUserPackageVariantResults < ActiveRecord::Migration[6.1]
  def change
    create_table :exam_user_package_variant_results, id: :uuid do |t|
      t.uuid :user_id
      t.references :exam_package, null: false, foreign_key: true, type: :uuid
      t.string :result
      t.string :group
      t.string :code

      t.timestamps
    end
  end
end
