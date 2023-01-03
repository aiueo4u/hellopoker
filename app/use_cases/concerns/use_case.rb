module UseCase
  extend ActiveSupport::Concern
  include ActiveModel::Model

  module ClassMethods
    def perform(**args)
      new(**args).tap(&:perform)
    end
  end

  def perform
    raise NotImplementedError
  end

  def success?
    errors.none?
  end

  def raise_rollback
    raise ActiveRecord::Rollback
  end

  def mark_error_and_rollback(field)
    errors.add(field, :failed)
    raise_rollback
  end
end
