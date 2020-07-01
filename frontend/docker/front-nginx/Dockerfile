FROM node:12.18.2-alpine3.12 as builder
ENV NODE_ENV='development'
ENV API_URL='http://dev-api.plizi.fun:1215'
ENV WS_URL='ws://dev-ws.plizi.fun:7070'
COPY frontend frontend
WORKDIR frontend/
RUN npm install  
RUN npm run build
 
FROM nginx:stable
COPY --from=builder dist /app
COPY docker/front-nginx/default.example.conf /etc/nginx/conf.d/default.conf
COPY docker/front-nginx/nginx.exanple.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=5s --timeout=30s \
  CMD curl --include --no-buffer \
          http://localhost:80 || exit 1
