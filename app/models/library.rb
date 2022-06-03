# == Schema Information
#
# Table name: libraries
#
#  id         :uuid             not null, primary key
#  category   :string
#  is_private :boolean          default(FALSE), not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Library < ApplicationRecord
  has_one_attached :file
  has_one_attached :cover
  has_one_attached :content_html
  validates :name, :category, :file, presence: true

  enum category: {
    modules: "modules",
    journal: "journal",
    theory: "theory",
    book: "book"
  }
end
