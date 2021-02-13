# 環境変数を読み込んでいるDotenvが、Configよりも後（辞書順）に実行されてしまいSettingsに値が設定されないので、ここで改めてSettingsに値を設定している。
# TODO: Configの削除（を検討）
# see: https://github.com/rubyconfig/config/blob/master/lib/config/integrations/rails/railtie.rb#L11
if Rails.env.development? || Rails.env.test?
  Config.load_and_set_settings(
    Config.setting_files(::Rails.root.join('config'), ::Rails.env),
  )
end
