FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest
COPY . .
RUN composer install

#RUN php artisan optimize

EXPOSE 1215

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
 CMD curl --include --no-buffer \
         http://localhost:1215 || exit 1

# start and setup scripts
COPY docker/back-api/docker-entrypoint.sh /usr/share/back-api/bin/
RUN chmod +x /usr/share/back-api/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/share/back-api/bin/docker-entrypoint.sh"]
