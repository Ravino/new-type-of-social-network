import { server } from './config/server';
import { environmentInitialization } from './config/environment';


environmentInitialization();


server.listen(3000, () => {
  console.log(`Application started on port 3000...`);
  return undefined;
});
