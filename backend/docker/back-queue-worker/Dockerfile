FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest

RUN apk add --no-cache \
    supervisor
COPY docker/back-queue-worker/docker-entrypoint.sh /usr/share/back-queue-worker/bin/
RUN chmod +x /usr/share/back-queue-worker/bin/docker-entrypoint.sh
COPY docker/back-queue-worker/laravel-supervisor.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app
COPY . .
RUN composer install

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
 CMD echo "healthy" || exit 1

ENTRYPOINT ["/usr/share/back-queue-worker/bin/docker-entrypoint.sh"]
CMD [""]
