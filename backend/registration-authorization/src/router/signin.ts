import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Local } from './local';


export class Signin {

  public constructor() {}


  public middleware(req: Request, res: Response, next: any) {
    next();
    return undefined;
  }


  public resolver(): Router {

    const router: Router = Router();


    router.use('/local',
      Container.get(Local).middleware,
      Container.get(Local).resolver
    );


    return router;
  }
}
