import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';


const router: Router = Router();


export function routerInitialization(server: Application) {
  server.use(router);
}
