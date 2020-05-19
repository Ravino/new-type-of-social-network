FROM node:14.2.0-alpine
WORKDIR /app
COPY package.json .
RUN npm i --quiet
COPY . .
RUN npm install pm2 -g
CMD ["pm2-runtime", "src/index.js"]
