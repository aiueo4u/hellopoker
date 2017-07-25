namespace :ridgepole do
  desc 'Apply database schema'
  task apply: :environment do
    ridgepole('--apply', "--file #{schema_file}")
    Rake::Task['db:schema:dump'].invoke
  end

  desc 'Export database schema'
  task export: :environment do
    ridgepole('--export', "--output #{schema_file}")
  end

  private

  def schema_file
    Rails.root.join('db', 'Schemafile')
  end

  def config_file
    Rails.root.join('config/database.yml')
  end

  def ridgepole(*options)
    command = ['bundle exec ridgepole', "--config #{config_file}", "--env #{Rails.env}"]
    system [command + options].join(' ')
  end
end
