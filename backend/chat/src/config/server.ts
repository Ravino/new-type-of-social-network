import express from 'express';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import {routerInitialization} from './router';


export const server: express.Application = express();


cookieParserInitialization(server);
bodyParserInitialization(server);
routerInitialization(server);
