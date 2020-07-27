FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest
COPY . .
RUN composer install

RUN php artisan optimize

EXPOSE 1215
COPY docker/back-api/docker-entrypoint.sh /usr/share/back-api/bin/
RUN chmod +x /usr/share/back-api/bin/docker-entrypoint.sh

# start and setup scripts
ENTRYPOINT ["/usr/share/back-api/bin/docker-entrypoint.sh"]
