import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { Signin } from '../router/signin';


const router: Router = Router();


router.use('/signin',
  Container.get(Signin).middleware,
  Container.get(Signin).resolver()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
