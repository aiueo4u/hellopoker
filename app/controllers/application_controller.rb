class ApplicationController < ActionController::Base
  include TreatUserAgent

  protect_from_forgery with: :exception

  before_action :detect_device_info
end
