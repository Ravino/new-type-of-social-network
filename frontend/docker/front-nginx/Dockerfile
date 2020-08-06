FROM node:12.18.2-alpine3.12 as builder
ENV NODE_ENV='development'
ENV API_URL='https://dev-api.plizi.fun'
ENV WS_URL='wss://dev-ws.plizi.fun'
COPY . .
#WORKDIR frontend/
RUN npm install  
RUN npm run build
 
FROM nginx:stable
COPY --from=builder dist /app
COPY dist /app
COPY docker/front-nginx/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY docker/front-nginx/etc/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

#EXPOSE 81
HEALTHCHECK --interval=30s --timeout=5s --retries=2 \
  CMD curl --include --no-buffer \
          http://localhost:80 || exit 1
