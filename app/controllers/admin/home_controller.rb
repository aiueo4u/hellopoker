class Admin::HomeController < Admin::ApplicationController
  def index
    @players = Player.all.to_a
    @other_service_accounts = OtherServiceAccount.all.to_a
    @tables = Table.all.to_a
    @client_versions = ClientVersion.order(created_at: :desc).limit(3)
  end
end
