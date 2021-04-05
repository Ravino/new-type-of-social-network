import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { VerificationPasswordRouter } from './verificationPasswordRouter';
import { VerificationEmailRouter } from './verificationEmailRouter';


export class VerificationRouter {

  public handler(): Router {

    const router: Router = Router();


    router.use('/email',
      Container.get(VerificationEmailRouter).handler
    );
    router.use('/password',
      Container.get(VerificationPasswordRouter).handler
    );


    return router;
  }
}
