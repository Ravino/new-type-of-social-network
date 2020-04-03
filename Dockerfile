FROM node:8-alpine as frontend-builder

RUN apk add git openssh-client python build-base --update && \
    rm -rf /var/cache/apk/*

RUN npm set progress=false && npm config set depth 0

WORKDIR /home/frontend-builder
COPY package*.json ./
RUN npm install
RUN npm build

COPY . /home/frontend-builder

FROM php:7.4-apache

RUN apt-get update && apt-get install -y libmcrypt-dev \
    libfreetype6-dev \
    libzmq3-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    ghostscript \
    default-mysql-client libmagickwand-dev --no-install-recommends && \
    pecl install imagick && \
    pecl install zmq-beta && \
    docker-php-ext-enable imagick zmq && \
    docker-php-ext-install mcrypt pdo_mysql mbstring exif && \
    docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ &&\
    docker-php-ext-install gd

ENV DOCKERIZE_VERSION v0.6.1
RUN curl --silent --location \
    --url https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    --output /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm /tmp/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apt-get update && \
    apt-get install -y git zip unzip && \
    php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer && \
    apt-get -y autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN composer global require "laravel/framework:7.*"

COPY docker-apache2-laravel.conf /etc/apache2/sites-available/laravel.conf
RUN a2dissite 000-default.conf && a2ensite laravel.conf && a2enmod rewrite

WORKDIR /var/www/html
COPY . .
RUN composer install
COPY --from=frontend-builder /home/frontend-builder/public ./public

RUN chown www-data -R storage public/temp public/t public/export public/assets
COPY entrypoint.sh /usr/local/bin/docker-php-entrypoint

CMD [ "/usr/local/bin/apache2-foreground" ]
