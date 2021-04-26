import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { GraphqlRouter } from '../router/graphqlRouter';
import { OtherRouter } from '../router/otherRouter';


const router: Router = Router();


router.use('/graphql',
  Container.get(GraphqlRouter).middleware
//  Container.get(OtherRouter).handler()
);


//router.use('/*',
//  Container.get(OtherRouter).middleware,
//  Container.get(OtherRouter).handler()
//);


export function routerInitialization(server: Application) {
  server.use(router);
}
