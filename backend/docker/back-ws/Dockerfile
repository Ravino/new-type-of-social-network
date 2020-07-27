FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest
COPY . .
RUN composer install
EXPOSE 7070
EXPOSE 5555

#RUN php artisan optimize

# start and setup scripts
COPY docker/back-ws/docker-entrypoint.sh /usr/share/back-ws/bin/
RUN chmod +x /usr/share/back-ws/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/share/back-ws/bin/docker-entrypoint.sh"]
