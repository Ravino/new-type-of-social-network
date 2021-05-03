import {Server} from 'socket.io';
import {NatsConnection} from 'nats';
import {natsInitialization} from './nats';
import {createAdapter} from '@mickl/socket.io-nats-adapter';
import {Server as HttpServer} from 'http';


export async function socketioInitialization(app: HttpServer) {
  const connectNats: NatsConnection = await natsInitialization();
  const server: Server = new Server(app);
  return undefined;
}
