FROM node:12

RUN mkdir /www && mkdir /www/backend-node-ws-jmeter
WORKDIR /www/backend-node-ws-jmeter
COPY . .
RUN npm install
EXPOSE 3000
EXPOSE 4000
STOPSIGNAL SIGTERM
ENTRYPOINT ["npm", "start"]
CMD [""]
