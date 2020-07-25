FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest
COPY . .
RUN composer install
EXPOSE 7070
EXPOSE 5555
COPY docker/back-ws/docker-entrypoint.sh /usr/share/docker-laravel/bin/
RUN chmod +x /usr/share/docker-laravel/bin/docker-entrypoint.sh

# start and setup scripts
ENTRYPOINT ["/usr/share/docker-laravel/bin/docker-entrypoint.sh"]
