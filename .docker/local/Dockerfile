FROM ruby:2.6.5

ENV RAILS_ENV development
ENV NODE_ENV development

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && \
    apt-get install -y \
      build-essential \
      nodejs \
      yarn && \
    rm -rf /var/lib/apt/lists/*

RUN gem install bundler:2.1.4

ADD . /app
