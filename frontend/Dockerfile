FROM nginx:stable
COPY dist /app
COPY docker/nginx/ssl/ /etc/nginx
COPY docker/nginx/default.example.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.exanple.conf /etc/nginx/nginx.conf
