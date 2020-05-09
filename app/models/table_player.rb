class TablePlayer < ApplicationRecord
  belongs_to :table
  belongs_to :player
end
