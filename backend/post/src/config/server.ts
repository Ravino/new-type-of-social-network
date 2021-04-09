import express from 'express';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import { apolloPostInitialization } from './apolloPost';


export const server: express.Application = express();


cookieParserInitialization(server);
bodyParserInitialization(server);
apolloPostInitialization(server);
