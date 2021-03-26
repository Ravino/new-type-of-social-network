import { authenticate } from 'passport';
import { Request } from 'express';
import { Response } from 'express';


export class Email {
  public constructor() {}
  public middleware(req: Request, res: Response, next: any) {

    authenticate('email', (err, user, info) => {

      if(err) {
        res.locals.info = 'error';
        next();
        return undefined;
      }


      if(info) {
        res.locals.info = info;
        next();
        return undefined;
      }


      res.locals.info = 'success';
      next();
    })(req, res, next);


    return undefined;
  }


  public resolver(req: Request, res: Response) {

    res.send(res.locals.info);


    return undefined;
  }
}
