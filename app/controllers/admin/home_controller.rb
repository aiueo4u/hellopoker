class Admin::HomeController < Admin::ApplicationController
  def index
    @tables = Table.all.to_a
  end
end
