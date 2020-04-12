module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_player

    def connect
      self.current_player = find_verified_player
    end

    def disconnect
      Rails.logger.info("DISCONNECTED")
    end

    private

    def find_verified_player
      jwt = session['jwt']
      payload = AuthToken.decode(jwt)
      Player.find(payload['id'])
    rescue
      reject_unauthorized_connection
    end
  end
end
