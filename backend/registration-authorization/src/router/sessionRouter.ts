import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { SessionUpdateRouter } from './sessionUpdateRouter';
import { SessionDestroyRouter } from './sessionDestroyRouter';


export class SessionRouter {

  public handler(): Router {

    const router: Router = Router();


    router.use('/update',
      Container.get(SessionUpdateRouter).handler
    );
    router.use('/destroy',
      Container.get(SessionDestroyRouter).handler
    );


    return router;
  }
}
