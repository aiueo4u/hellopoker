class FacebookClient
  def self.valid_access_token?(access_token)
    result = app_client.debug_token(access_token)

    # 結果チェック
    unless result['data']['is_valid']
      return false
    end

    # アプリIDをチェック
    unless result['data']['app_id'].to_i == client_key
      return false
    end

    true
  end

  def self.client_key
    Settings.facebook.app_id
  end

  def self.client_secret
    Settings.facebook.app_secret
  end

  def self.app_access_token
    @app_access_token ||= Koala::Facebook::OAuth.new(client_key, client_secret).get_app_access_token
  end

  def self.get_user_client(access_token)
    Koala::Facebook::API.new(access_token, client_secret)
  end

  def self.app_client
    @app_client ||= Koala::Facebook::API.new(app_access_token, client_secret)
  end

  def self.test_users_client
    @test_users_client ||= Koala::Facebook::TestUsers.new(app_id: client_key, secret: client_secret)
  end
end
