# bin/deploy.sh
#!/bin/bash
set -e

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
RAILS_ENV=production bundle exec rake db:migrate