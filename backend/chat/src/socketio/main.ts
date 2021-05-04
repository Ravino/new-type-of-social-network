import {Socket} from 'socket.io';
import {socketioServer} from '../config/socketio';

import {
  preWorkMessage,
  postWorkMessage
} from './handler';


socketioServer.on('connect', (socket: Socket) => {

  socket.on('room-join', (data: any) => {
    socket.join(`room-${data}`);
    return undefined;
  });


  socket.on('room-message', (data: any) => {

    const preMessage: any = preWorkMessage(data);
    const postMessage: any = postWorkMessage(preMessage);
    const chatId: string = preMessage.chatId;


    socket.in(`room-${chatId}`).emit('room-message', postMessage);
    return undefined;
  });


  return undefined;
});
