"use strict";

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000');


const msg = {
  type: "chat-join",
  data: {
    idChat: 123
  }
};


const msg2 = {
  type: "chat-message",
  data: {
    idChat: 123,
    body: "fuck"
  }
};


ws.on('open', function open() {
  ws.send(JSON.stringify(msg));
});

setInterval(() => {
  ws.send(JSON.stringify(msg2));
}, 1000);
