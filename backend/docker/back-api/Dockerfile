FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/laravel-docker:latest
COPY . .
RUN composer install

EXPOSE 1215
COPY docker/back-api/docker-entrypoint.sh /usr/share/docker-laravel/bin/
RUN chmod +x /usr/share/docker-laravel/bin/docker-entrypoint.sh

# start and setup scripts
ENTRYPOINT ["/usr/share/docker-laravel/bin/docker-entrypoint.sh"]
