FROM php:7.4-alpine

# Install dev dependencies
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    curl-dev \
    imagemagick-dev \
    libtool \
    libxml2-dev

# Install production dependencies
RUN apk add --no-cache \
    bash \
    curl \
    freetype-dev \
    g++ \
    git \
    gcc \
    icu-dev \
    icu-libs \
    imagemagick \
    libc-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    make \
    mysql-client \
    oniguruma-dev \
    openssh-client \
    rsync \
    zlib-dev \
    autoconf

RUN apk add --no-cache \
    libzmq \
    zeromq-dev

RUN git clone git://github.com/mkoppanen/php-zmq.git \
 && cd php-zmq \
 && phpize && ./configure \
 && make \
 && make install \
 && cd .. \
 && rm -fr php-zmq

# Install PECL and PEAR extensions
RUN pecl install \
    imagick \
    mongodb \
    swoole

RUN apk update && \
    apk add --no-cache $PHPIZE_DEPS git libuv-dev && \
    git clone https://github.com/bwoebi/php-uv uv
RUN cd uv \
    && phpize \
    && ./configure \
    && make install \
    && EXTENSION_DIR=`php-config --extension-dir 2>/dev/null` && \
    cp "$EXTENSION_DIR/uv.so" /uv.so

# Enable PECL and PEAR extensions
RUN docker-php-ext-enable \
    imagick \
    mongodb \
    swoole \
    zmq

RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

# Configure php extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Install php extensions
RUN docker-php-ext-install \
    bcmath \
    calendar \
    curl \
    exif \
    gd \
    iconv \
    intl \
    mbstring \
    pdo \
    pdo_mysql \
    pcntl \
    tokenizer \
    xml \
    zip

# Install composer
ENV COMPOSER_HOME /composer
ENV PATH ./vendor/bin:/composer/vendor/bin:$PATH
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer

# Cleanup dev dependencies
RUN apk del -f .build-deps

# start and setup scripts
COPY docker/docker-parent-entrypoint.sh /usr/share/docker-laravel/bin/
RUN chmod +x /usr/share/docker-laravel/bin/docker-parent-entrypoint.sh
ENTRYPOINT ["/usr/share/docker-laravel/bin/docker-parent-entrypoint.sh"]