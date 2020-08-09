class Admin::ApplicationController < ApplicationController
  before_action :check_basic_authentication

  private

  def check_basic_authentication
    name = 'admin'
    passwd = '25a53221635e213adebc67f945d2cc5e07ec3073'
    authenticate_or_request_with_http_basic('BA') do |n, p|
      n == name && Digest::SHA1.hexdigest(p) == passwd
    end
  end
end
