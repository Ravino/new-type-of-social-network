FROM node:14.4.0-alpine

FROM nginx:stable
COPY dist /app
COPY docker/front-nginx/default.example.conf /etc/nginx/conf.d/default.conf
COPY docker/front-nginx/nginx.exanple.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=5s --timeout=30s \
  CMD curl --include --no-buffer \
          http://localhost:80 || exit 1

ENTRYPOINT ["echo \"Start nginx\" && nginx -g \"daemon off;\""]
