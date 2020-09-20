FROM ruby:2.6.5

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && \
    apt-get install -y \
    build-essential \
    nodejs \
    yarn

RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /app

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY . /app

ENV RAILS_ENV production
ENV SECRET_KEY_BASE=null
ENV DB_ADAPTER=nulldb

RUN gem install bundler:2.1.4

# See: https://github.com/sass/sassc-ruby/issues/146#issuecomment-608489863
RUN bundle config specific_platform x86_64-linux \
  && bundle config --local build.sassc --disable-march-tune-native

RUN bundle config set without 'development test'
RUN bundle install --jobs=4
RUN yarn install

RUN yarn run build
RUN bundle exec rails assets:precompile
