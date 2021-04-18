import express from 'express';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import { apolloGatewayInitialization } from './apolloGateway';


export const server: express.Application = express();


cookieParserInitialization(server);
bodyParserInitialization(server);
apolloGatewayInitialization(server);
