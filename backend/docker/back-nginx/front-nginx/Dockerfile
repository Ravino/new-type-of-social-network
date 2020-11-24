FROM node:12.18.3-alpine3.12 as frontend-builder
ENV NODE_ENV='development'
ENV API_URL='http://localhost:9090'
ENV WS_URL='ws://localhost:7070'
COPY app/ .
RUN npm install 
RUN npm run build
 
FROM nginx:stable
COPY --from=frontend-builder dist /app
#COPY dist /app
COPY etc/nginx/conf.d/dev.plizi.fun.conf /etc/nginx/conf.d/dev.plizi.fun.conf
COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
# certificates: 
COPY etc/ssl/cert.pem /etc/nginx/ssl/cert.pem
COPY etc/ssl/chain.pem /etc/nginx/ssl/chain.pem
COPY etc/ssl/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY etc/ssl/privkey.pem /etc/nginx/ssl/privkey.pem

RUN cd /etc/nginx/ \
    openssl dhparam -out dhparam.pem 4096

#RUN chown -R www-data:www-data /app

EXPOSE 80
#EXPOSE 443

#EXPOSE 81
HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
 CMD curl --include --no-buffer \
         http://localhost:80 || exit 1
