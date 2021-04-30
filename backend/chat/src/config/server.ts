import {Server} from 'http';
import express, {Application} from 'express';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import {routerInitialization} from './router';
import {socketioInitialization} from './socketio';


const app: Application = express();
export const server: Server = new Server(app);


cookieParserInitialization(app);
bodyParserInitialization(app);
routerInitialization(app);
socketioInitialization(server);
