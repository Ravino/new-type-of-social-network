FROM 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-laravel-docker:latest

COPY docker-entrypoint.sh /usr/share/back-api/bin/
RUN chmod +x /usr/share/back-api/bin/docker-entrypoint.sh

WORKDIR /app
COPY backend/ ./
#RUN chown 666 .
RUN composer install

EXPOSE 1215

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
 CMD curl --include --no-buffer \
         http://localhost:1215 || exit 1

ENTRYPOINT ["/usr/share/back-api/bin/docker-entrypoint.sh"]
#ENTRYPOINT ["/bin/bash","-c"]
CMD [""]
