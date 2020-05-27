FROM nginx:stable
COPY public /app
COPY docker/nginx/default.example.conf /etc/nginx/conf.d/default.conf
RUN  mv /app/index.html.example /app/index.html 
