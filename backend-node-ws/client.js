"use strict";


const envTimer = global.process.env.TIMER;
const envStepTime = global.process.env.STEP_TIME;
const envSocketAddress = global.process.env.SOCKET_ADDRESS;


const SocketIoClient = require ("socket.io-client");


const socketIoClient = SocketIoClient (envSocketAddress, { "transports": ["websocket"], upgrade: false});


const msg = {
  "idChat": 12,
  "data": "fuck"
};


socketIoClient.on("connect", () => {
  console.log("Connected on port " + envSocketAddress);
  socketIoClient.emit("chat-join", msg);


socketIoClient.on("chat-message", (data) => {
//  console.log(data);
  return undefined;
});


  setInterval(() => {
    socketIoClient.emit("chat-message", msg);
  }, envStepTime);


  setTimeout(() => {
    global.process.exit();
  }, envTimer);


  return undefined;
});
