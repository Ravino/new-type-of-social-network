"use strict";


const envSocketPort = global.process.env.SOCKET_PORT;
const envRedisHost = global.process.env.REDIS_HOST;
const envRedisPort = global.process.env.REDIS_PORT;
const envQueue = global.process.env.QUEUE;
const envRoomChat = global.process.env.ROOM_CHAT;


const app = require("express")();
const http = require("http");
const SocketIo = require ("socket.io");
const SocketIoRedis = require ("socket.io-redis");
const Ioredis = require ("ioredis");


const ioredis = new Ioredis(`redis://${ envRedisHost }:${ envRedisPort }`);


const httpServer = http.Server(app);
const socketIo = SocketIo(httpServer);
const socketIoRedis = SocketIoRedis (`redis://${ envRedisHost }:${ envRedisPort }`);


socketIo.adapter(socketIoRedis);




socketIo.on ("connect", (socket) => {

  socket.on("chat-join", (data) => {
    socket.join(envRoomChat + data.idChat);
    return undefined;
  });


  socket.on("chat-message", (data) => {

    data.createdAt = Date.now();


    const dataStringify = JSON.stringify(data);


    ioredis.rpush(envQueue, dataStringify);
    socket.in(envRoomChat + data.idChat).emit("chat-message", data);


    return undefined;
  });


  return undefined;
});


app.use("/check", (req, res) => {
  res.sendStatus(200);
  return undefined;
});




httpServer.listen(envSocketPort);
