import {tarantool} from './config/tarantool';
import {nats} from './config/nats';
import { environmentInitialization } from './config/environment';


environmentInitialization();


tarantool.on('connect', async () => {

  const ns = await nats();
  console.log(ns.getServer());


  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});
