import {Container} from 'typescript-ioc';

import {
  Socket as SocketioSocket,
  Server as SocketioServer
} from 'socket.io';

import {Server as HttpServer} from 'http';
import express, {Application, Request} from 'express';
import {socketioConfig} from './socketio';
import {cookieParserInitialization} from './cookieParser';
import {bodyParserInitialization} from './bodyParser';
import {preWorkMessage} from '../handler/message';
import {MessageService} from '../service/messageService';


const app: Application = express();
export const httpServer: HttpServer = new HttpServer(app);
const socketioServer: SocketioServer = new SocketioServer(httpServer, socketioConfig);


cookieParserInitialization(socketioServer);
bodyParserInitialization(socketioServer);
socketioServer.use((socket: SocketioSocket, next: any) => {
  const request: Request = <Request>socket.request;
  request.user = {id: 2};
  next();
  return undefined;
});


socketioServer.on('connect', (socketioSocket: SocketioSocket) => {

  socketioSocket.on('room-message', async (data: any) => {

    const request: Request = <Request>socketioSocket.request;
    const user: any = request.user;
    const preMessage: any = preWorkMessage(data, user);
    Container.get(MessageService).create(preMessage.chatId, preMessage.senderId, preMessage.body);


    return undefined;
  });


  return undefined;
});
