require 'rack/proxy'

module Rack
  class DevServerProxy < Rack::Proxy
    def initialize(app)
      @app = app
    end

    def perform_request(env)
      if env["PATH_INFO"].start_with?("/webpacks") && Rails.env.development?
        env["HTTP_HOST"] = env["HTTP_X_FORWARDED_HOST"] = env["HTTP_X_FORWARDED_SERVER"] = 'localhost:3045'
        env["HTTP_X_FORWARDED_PROTO"] = env["HTTP_X_FORWARDED_SCHEME"] = 'http'
        env["HTTPS"] = env["HTTP_X_FORWARDED_SSL"] = "off"
        env["SCRIPT_NAME"] = ""

        super(env)
      else
        @app.call(env)
      end
    end
  end
end

