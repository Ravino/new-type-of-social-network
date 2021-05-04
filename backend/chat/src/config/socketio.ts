import {Server} from 'socket.io';
import {server as httpServer} from './server';


const config = {
  path: '/websocket'
};


export const socketioServer: Server = new Server(httpServer, config);
