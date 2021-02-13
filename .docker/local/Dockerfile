FROM ruby:2.6.5

ENV RAILS_ENV development
ENV NODE_ENV development

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && \
    apt-get install -y \
      build-essential \
      nodejs \
      yarn && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN gem install bundler:2.1.4 && \
    bundle install --path vendor/bundle --jobs=4 && \
    yarn install

ADD . /app
