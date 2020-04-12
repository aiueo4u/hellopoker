module WebpackBundleHelper
  def javascript_webpack_tag(*entries)
    paths = entries.flat_map { |entry| webpack_manifest['entrypoints'][entry]['js'] }.uniq
    javascript_include_tag(*paths)
  rescue
    ''
  end

  private

  def webpack_manifest
    if Rails.env.production?
      Rails.application.config.assets_manifest
    else
      JSON.parse(File.read(Rails.public_path.join('webpacks', 'manifest.json')))
    end
  end
end
