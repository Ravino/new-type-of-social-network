#
# Global arguments for multistage
ARG VERSION=default

#
# Application code builder
FROM node:13-alpine as build-stage

ARG VERSION
ENV BUILDER_VERSION $VERSION
RUN echo ${BUILDER_VERSION}
RUN echo ${VERSION}

WORKDIR /app
COPY package*.json ./

ENV NODE_ENV='development'
ENV API_URL='https://dev-api.plizi.fun'
ENV WS_URL='wss://dev-ws.plizi.fun'

RUN npm install 

COPY ./ .
RUN npm run build
#RUN npm run build -- --prod --output-path=/dist

#
# Main application container
FROM nginx:stable as deploy-stage

ARG VERSION
RUN echo ${VERSION}
COPY --from=build-stage /app/dist /app

COPY docker/front-nginx/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY docker/front-nginx/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/front-nginx/startup.sh . 

RUN chown -R nginx:nginx /app && chmod +x startup.sh 

EXPOSE 80

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
  CMD curl --include --no-buffer \
          http://localhost:80 || exit 1

CMD ["./startup.sh"]