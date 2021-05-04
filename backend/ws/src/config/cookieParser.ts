import {Server, Socket} from 'socket.io';
import {Request, Response} from 'express';
import { readFileSync, realpathSync } from 'fs';
import cookieParser from 'cookie-parser';


const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);
const publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});


export const confSetCookie = {
  nameCookie: <string>global.process.env.CONF_SET_COOKIE_NAME || '',
  params: {
    domain: <string>global.process.env.CONF_SET_COOKIE_DOMAIN,
    httpOnly: true,
    path: '/',
    secure: true,
    signed: true
  }
};


function wrapper(socket: Socket, next: any) {
  const middleware = cookieParser(publicKey);
  middleware(<Request>socket.request, <Response>{}, next);
  return undefined;
}


export function cookieParserInitialization(server: Server) {
  server.use(wrapper);
  return undefined;
}
