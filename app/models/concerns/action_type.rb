module ActionType
  extend ActiveSupport::Concern

  included do
    enum action_type: %i(
      blind
      check
      bet
      call
      fold
      taken
      show
      muck
    )
  end
end
