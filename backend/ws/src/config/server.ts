import {
  Socket as SocketioSocket,
  Server as SocketioServer
} from 'socket.io';

import {Server as HttpServer} from 'http';
import express, {Application} from 'express';
import {socketioConfig} from './socketio';
import {cookieParserInitialization} from './cookieParser';
import {bodyParserInitialization} from './bodyParser';
import {preWorkMessage, postWorkMessage} from '../handler/message';


const app: Application = express();
export const httpServer: HttpServer = new HttpServer(app);
const socketioServer: SocketioServer = new SocketioServer(httpServer, socketioConfig);


cookieParserInitialization(socketioServer);
bodyParserInitialization(socketioServer);


socketioServer.on('connect', (socketioSocket: SocketioSocket) => {

  socketioSocket.on('room-join', (data: any) => {
    const chatId: string = data.chatId;
    socketioSocket.join(`room-${chatId}`);
    return undefined;
  });


  socketioSocket.on('room-message', (data: any) => {

    const preMessage: any = preWorkMessage(data);
    const postMessage: any = postWorkMessage(preMessage);
    const chatId: string = preMessage.chatId;


    socketioSocket.in(`room-${chatId}`).emit('room-message', postMessage);
    return undefined;
  });


  return undefined;
});
