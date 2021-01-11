FROM node:12

RUN mkdir /www && mkdir /www/backend-node-ws
WORKDIR /www/backend-node-ws
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
