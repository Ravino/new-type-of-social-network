import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { RecoveryPasswordRouter } from './recoveryPasswordRouter';


export class RecoveryRouter {

  public handler(): Router {

    const router: Router = Router();


    router.use('/password',
      Container.get(RecoveryPasswordRouter).handler
    );


    return router;
  }
}
