import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class EmailResolver {

  public authenticate(req: Request, res: Response) {

    authenticatePassport('email', (err, user, info) => {

      if(err) {
        res.locals.info = 'error';
        return undefined;
      }


      if(info) {
        res.locals.info = info;
        return undefined;
      }


      res.locals.info = 'success';
    })(req, res);


    return undefined;
  }


  public done(req: Request, res: Response): StatusView {
    this.authenticate(req, res);
    return <StatusView>{
      status: 'success',
      description: '',
      data: null
    };
  }
}
