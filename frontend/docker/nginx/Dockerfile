FROM nginx:stable
COPY public /app
COPY docker/nginx/default.example.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.exanple.conf /etc/nginx/nginx.conf
RUN  mv /app/index.html.example /app/index.html
RUN echo "nameserver 8.8.8.8" >> /etc/resolv.conf
