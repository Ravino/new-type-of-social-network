import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { EmailRouter } from './emailRouter';
import { VkontakteRouter } from './vkontakteRouter';


export class SigninRouter {

  public handler(): Router {

    const router: Router = Router();


    router.use('/email',
      Container.get(EmailRouter).handler
    );
    router.use('/vkontakte',
      Container.get(VkontakteRouter).handler
    );


    return router;
  }
}
