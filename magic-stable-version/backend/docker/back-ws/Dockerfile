FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/laravel-docker

RUN apk add busybox-extras

COPY docker/back-ws/docker-entrypoint.sh /usr/share/back-ws/bin/
RUN chmod +x /usr/share/back-ws/bin/docker-entrypoint.sh

WORKDIR /app
COPY . .
RUN composer install

EXPOSE 7070
EXPOSE 5555

STOPSIGNAL SIGTERM

#HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
# CMD busybox-extras telnet 127.0.0.1 7070 || exit 1

ENTRYPOINT ["/usr/share/back-ws/bin/docker-entrypoint.sh"]
#ENTRYPOINT [""]
CMD [""]
