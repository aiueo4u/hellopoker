class OtherServiceAccount < ApplicationRecord
  belongs_to :player

  enum provider: {
    twitter: 1,
    facebook: 2
  }
end
