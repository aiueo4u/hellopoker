require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HelloPoker
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.eager_load_paths << Rails.root.join('lib')
    config.autoload_paths += %W(#{config.root}/lib)

    # load config/application.yml
    config_for(:application).each do |key, value|
      config.x.send("#{key}=", value)
    end

    # for file upload by paperclip
    config.paperclip_defaults = {
      storage: :s3,
      s3_credentials: {
        bucket: Settings.aws.s3.bucket,
        access_key_id: Settings.aws.s3.access_key_id,
        secret_access_key: Settings.aws.s3.secret_access_key,
        s3_region: 'ap-northeast-1',
        s3_host_name: 's3-ap-northeast-1.amazonaws.com',
      },
      s3_protocol: 'https',
    }
  end
end
