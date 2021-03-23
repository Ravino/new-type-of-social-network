"use strict";


const envSocketPort = global.process.env.SOCKET_PORT;
const envRedisHost = global.process.env.REDIS_HOST;
const envRedisPort = global.process.env.REDIS_PORT;
const envQueue = global.process.env.QUEUE;
const envRoomChat = global.process.env.ROOM_CHAT;


const app = require("express")();
const http = require("http");
const SocketIoEmitter = require ("socket.io-emitter");
const Ioredis = require ("ioredis");
const WebSocket = require ("ws");


const ioredis = new Ioredis(`redis://${ envRedisHost }:${ envRedisPort }`);


const httpServer = http.Server(app);
const socketIoEmitter = SocketIoEmitter (`redis://${ envRedisHost }:${ envRedisPort }`);
const webSocketServer = new WebSocket.Server({server: httpServer});


webSocketServer.on("connection", (socket) => {

  console.log("client connect");
  socket.send("connect");


  socket.on("message", (data) => {

    ioredis.rpush(envQueue, data);


    try {
      data = JSON.parse(data);
    }
    catch(err) {
      console.log(err);
      socket.send("Error data");
      return undefined;
    }


    console.log(data);
//    socket.send("message delivered");
    socketIoEmitter.to(envRoomChat + data.idChat).emit("chat-message", data);
    return undefined;
  });


  return undefined;
});


app.use("/check", (req, res) => {
  res.sendStatus(200);
  return undefined;
});


httpServer.listen(envSocketPort);
