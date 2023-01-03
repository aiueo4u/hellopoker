# opengraph_parser と paperclip 内で URI.escapeが使われているため一旦モンキーパッチで対応している
# opengraph_parser と paperclip はメンテされていなさそうなので乗り換えが必要
module URI
  class << self
    def escape(url)
      WEBrick::HTTPUtils.escape(url)
    end

    def decode(url)
      WEBrick::HTTPUtils.unescape(url)
    end
  end
end
