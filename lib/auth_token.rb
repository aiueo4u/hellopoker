require 'jwt'

class AuthToken
  def self.encode(payload)
    # TODO: 期限チェック
    JWT.encode(payload, nil, 'none')
  end

  def self.decode(token)
    JWT.decode(token, nil, false)[0]
  end
end
