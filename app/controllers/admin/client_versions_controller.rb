class Admin::ClientVersionsController < Admin::ApplicationController
  def create
    ClientVersion.create!(version: Time.current.in_time_zone('Asia/Tokyo').strftime('%Y%m%d%H%M'))
    redirect_to admin_path
  end
end
