FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/centos7-php7.4
RUN yum install php-pecl-swoole -y
RUN yum install php-pecl-zmq -y
WORKDIR /app
ADD https://getcomposer.org/installer /root/
RUN cd /root/ \
    && php installer \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer
RUN yum install php-pecl-mongodb -y
RUN yum install php-bcmath -y
COPY .. .
RUN composer install

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /
EXPOSE 1215
COPY docker-entrypoint.sh /usr/share/docker-laravel/bin/
RUN chmod +x /usr/share/docker-laravel/bin/docker-entrypoint.sh

# start and setup scripts
ENTRYPOINT ["/usr/share/docker-laravel/bin/docker-entrypoint.sh"]
