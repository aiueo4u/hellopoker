Rails.application.config.assets_manifest =
  if File.exist?(Rails.public_path.join('webpacks', 'manifest.json'))
    JSON.parse(File.read(Rails.public_path.join('webpacks', 'manifest.json')))
  end
