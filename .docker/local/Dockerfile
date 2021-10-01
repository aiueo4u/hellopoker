FROM ruby:2.7.4

ENV RAILS_ENV development
ENV NODE_ENV development

WORKDIR /app

RUN bundle config set path 'vendor/bundle'

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && \
    apt-get install -y \
      build-essential \
      nodejs \
      yarn && \
    rm -rf /var/lib/apt/lists/*

COPY . /app
