import TarantoolDriver from 'tarantool-driver';
import { tarantool } from './config/tarantool';
import { server } from './config/server';
import { environmentInitialization } from './config/environment';
import { ipInfoInitialization } from './config/ipInfo';
import { bodyParserInitialization } from './config/bodyParser';
import { passportInitialization } from './config/passport';
import { routerInitialization } from './config/router';


environmentInitialization();
ipInfoInitialization(server);
bodyParserInitialization(server);
passportInitialization(server);
routerInitialization(server);

tarantool.on('connect', () => {

  server.listen(3000, () => {
    console.log(`Application started on port 3000...`);
    return undefined;
  });


  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});
