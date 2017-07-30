class OtherServiceAccount < ApplicationRecord
  enum provider: {
    twitter: 1,
    facebook: 2
  }
end
