import {Socket, Server} from 'socket.io';
import {Request, Response} from 'express';
import bodyParser from 'body-parser';


function wrapperOne(socket: Socket, next: any) {
  const middleware = bodyParser.json();
  middleware(<Request>socket.request, <Response>{}, next);
  return undefined;
}


function wrapperTwo(socket: Socket, next: any) {
  const middleware = bodyParser.urlencoded({extended: true});
  middleware(<Request>socket.request, <Response>{}, next);
  return undefined;
}


export function bodyParserInitialization(server: Server) {
  server.use(wrapperOne);
  server.use(wrapperTwo);
  return undefined;
}
