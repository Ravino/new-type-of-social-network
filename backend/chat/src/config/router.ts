import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import {OtherRouter} from '../router/otherRouter';


const router: Router = Router();


router.use('/*',
  Container.get(OtherRouter).middleware
);


export function routerInitialization(server: Application) {
  server.use(router);
}
