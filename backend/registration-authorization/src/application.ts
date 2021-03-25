import { server } from './config/server';
import { passportInitialization } from './config/passport';
import { routerInitialization } from './config/router';


passportInitialization(server);
routerInitialization(server);


server.listen(3000, () => {
  console.log(`Application started on port 3000...`);
});
