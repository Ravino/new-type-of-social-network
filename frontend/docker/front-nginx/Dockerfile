#
# Global arguments for multistage
ARG VERSION=default

#
# Application code [build-stage]
FROM node:13-alpine as build-stage

ARG VERSION
ENV BUILDER_VERSION $VERSION
RUN echo ${BUILDER_VERSION}
RUN echo ${VERSION}

WORKDIR /app
RUN echo -e "[build-stage] version: ${BUILDER_VERSION} " > /app/build.json
RUN echo -e "[build-stage] start time: "`date '+%Y-%m-%d %H:%M:%S'` >> /app/build.json
COPY app/package*.json ./

ENV NODE_ENV='development'
ENV API_URL='http://localhost:1215'
ENV WS_URL='ws://localhost:7070'

RUN npm install 

COPY app/ ./
#RUN npm run build
RUN echo "[build-stage] finish time: "`date '+%Y-%m-%d %H:%M:%S'` >> /app/build.json
RUN npm run build -- --prod --output-path=/dist

#
# Main application container
FROM nginx:stable as deploy-stage

ARG VERSION
RUN echo ${VERSION}
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/build.json /app/build.json

RUN echo -e "[deploy-stage] version: ${VERSION} " >> /app/build.json
RUN echo -e "[deploy-stage] start time: "`date '+%Y-%m-%d %H:%M:%S'` >> /app/build.json

COPY etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY etc/nginx/ssl/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY etc/nginx/ssl/privkey.pem /etc/nginx/ssl/privkey.pem
COPY startup.sh .
RUN chown -R nginx:nginx /app
RUN chmod +x /startup.sh 

# 512 for test
RUN openssl dhparam -out /etc/nginx/dhparam.pem 512
# 4096 for prod
# RUN openssl dhparam -out dhparam.pem  4096
RUN echo "[build-stage] finish time: "`date '+%Y-%m-%d %H:%M:%S'` >> /app/build.json

EXPOSE 80
EXPOSE 443

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
  CMD curl --include --no-buffer \
          https://localhost:443 || exit 1

ENTRYPOINT [""]
CMD ["/startup.sh"]
