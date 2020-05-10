class Admin::ApplicationController < ApplicationController
  before_action :check_basic_authentication

  private

  def check_basic_authentication
    name = 'admin'
    passwd = '82fdd4175498fe0c906e75e2d171a0d6a1baa88f'
    authenticate_or_request_with_http_basic('BA') do |n, p|
      n == name && Digest::SHA1.hexdigest(p) == passwd
    end
  end
end
