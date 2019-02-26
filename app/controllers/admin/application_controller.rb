class Admin::ApplicationController < ApplicationController
  before_action :check_basic_authentication

  private

  def check_basic_authentication
    name = 'poker'
    passwd = '53ddd2b22a573040131269b9656ef013a37e3f66'
    authenticate_or_request_with_http_basic('BA') do |n, p|
      n == name && Digest::SHA1.hexdigest(p) == passwd
    end
  end
end
