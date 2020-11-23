module TreatUserAgent
  extend ActiveSupport::Concern

  included do
    helper_method :user_agent_type

    private

    def user_agent_type
      user_agent.device.mobile? ? 'mobile' : 'pc'
    end

    def user_agent
      @user_agent ||= Browser.new(request.user_agent)
    end

    # UAによるテンプレートファイルの出し分け
    def detect_device_info
      if user_agent_type == 'pc'
        request.variant = :pc
      end
    end
  end
end
