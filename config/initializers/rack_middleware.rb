if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::DevServerProxy
end
