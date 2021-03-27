import { server } from './config/server';
import { environmentInitialization } from './config/environment';
import { bodyParserInitialization } from './config/bodyParser';
import { passportInitialization } from './config/passport';
import { routerInitialization } from './config/router';


environmentInitialization();
bodyParserInitialization(server);
passportInitialization(server);
routerInitialization(server);


server.listen(3000, () => {
  console.log(`Application started on port 3000...`);
});
