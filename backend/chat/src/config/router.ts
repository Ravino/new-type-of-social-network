import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { WebsocketRouter } from '../router/websocketRouter';


const router: Router = Router();


router.use('/ws',
  Container.get(WebsocketRouter).middleware
//  Container.get(GraphqlRouter).handler()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
