FROM node:12.18.3-alpine3.12 as frontend-builder
ENV NODE_ENV='development'
ENV API_URL='https://dev-api.plizi.fun'
ENV WS_URL='wss://dev-ws.plizi.fun'
COPY . .
RUN npm install 
RUN npm run build
 
FROM nginx:stable
COPY --from=frontend-builder dist /app
#COPY dist /app
COPY docker/front-nginx/etc/nginx/conf.d/dev.plizi.fun.conf /etc/nginx/conf.d/dev.plizi.fun.conf
COPY docker/front-nginx/etc/nginx/nginx.conf /etc/nginx/nginx.conf
# certificates: 
COPY docker/front-nginx/etc/ssl/cert.pem /etc/nginx/ssl/cert.pem
COPY docker/front-nginx/etc/ssl/chain.pem /etc/nginx/ssl/chain.pem
COPY docker/front-nginx/etc/ssl/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY docker/front-nginx/etc/ssl/privkey.pem /etc/nginx/ssl/privkey.pem

RUN cd /etc/nginx/ \
    openssl dhparam -out dhparam.pem 4096

RUN chown -R www-data:www-data /app

#EXPOSE 80
#EXPOSE 443

#EXPOSE 81
#HEALTHCHECK --interval=30s --timeout=5s --retries=2 \
#  CMD curl --include --no-buffer \
#          http://localhost:80 || exit 1
