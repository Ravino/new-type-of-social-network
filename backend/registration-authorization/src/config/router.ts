import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { SigninRouter } from '../router/signinRouter';


const router: Router = Router();


router.use('/signin',
  Container.get(SigninRouter).handler()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
