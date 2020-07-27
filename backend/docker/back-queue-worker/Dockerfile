FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest
COPY . .
RUN composer install

#RUN php artisan optimize

# start and setup scripts
COPY docker/back-queue-worker/docker-entrypoint.sh /usr/share/back-queue-worker/bin/
RUN chmod +x /usr/share/back-queue-worker/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/share/back-queue-worker/bin/docker-entrypoint.sh"]
