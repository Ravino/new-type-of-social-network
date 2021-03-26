import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Email } from './email';


export class Signin {

  public constructor() {}


  public middleware(req: Request, res: Response, next: any) {
    next();
    return undefined;
  }


  public resolver(): Router {

    const router: Router = Router();


    router.use('/email',
      Container.get(Email).middleware,
      Container.get(Email).resolver
    );


    return router;
  }
}
