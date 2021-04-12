import express from 'express';
import { environmentInitialization } from './environment';
import { helmetInitialization } from './helmet';
import { ipInfoInitialization } from './ipInfo';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import { passportInitialization } from './passport';
import { routerInitialization } from './router';


export const server: express.Application = express();


environmentInitialization();
helmetInitialization(server);
ipInfoInitialization(server);
cookieParserInitialization(server);
bodyParserInitialization(server);
passportInitialization(server);
routerInitialization(server);
