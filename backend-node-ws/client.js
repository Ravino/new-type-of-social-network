"use strict";


const envSocketAddress = global.process.env.SOCKET_ADDRESS;


const SocketIoClient = require ("socket.io-client");


const socketIoClient = SocketIoClient (envSocketAddress);


const msg = {
  "idChat": 12,
  "data": "fuck"
};


socketIoClient.on("connect", () => {
  console.log("Connected on port " + envSocketPort);
  socketIoClient.emit("chat-join", msg);


socketIoClient.on("chat-message", (data) => {
  console.log(data);
  return undefined;
});


  setInterval(() => {
    socketIoClient.emit("chat-message", msg);
  }, 1);


  return undefined;
});

