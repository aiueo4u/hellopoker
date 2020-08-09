module Command
  extend ActiveSupport::Concern
  include ActiveModel::Model

  module ClassMethods
    def run(*args)
      new(*args).tap { |command| command.run }
    end
  end

  def run
    raise NotImplementedError
  end

  def success?
    errors.none?
  end

  private

  def initialize
    super
  end

  def raise_rollback
    raise ActiveRecord::Rollback
  end
end
