import {Server as SocketioServer} from 'socket.io';
import {Server as HttpServer} from 'http';
import express, {Application} from 'express';
import {socketioConfig} from './socketio';


const app: Application = express();
export const httpServer: HttpServer = new HttpServer(app);
const socketioServer: SocketioServer = new SocketioServer(httpServer, socketioConfig);
