Rails.application.config.middleware.use OmniAuth::Builder do
  secrets = Rails.application.secrets
  provider :twitter, secrets.twitter[:consumer_key], secrets.twitter[:consumer_secret]
  provider :facebook, secrets.facebook[:app_id], secrets.facebook[:app_secret]
end
