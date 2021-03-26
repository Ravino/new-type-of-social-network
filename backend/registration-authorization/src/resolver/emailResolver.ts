import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class EmailResolver {

  public async authenticate(req: Request, res: Response): Promise<string> {

    let result: string = '';


    authenticatePassport('email', (err, user, info) => {

console.log(info);

      if(err) {
        result = 'error';
        return undefined;
      }


      if(info) {
        result = info.message;
        return undefined;
      }


      result = 'success';
      return undefined;
    })(req, res);


    return result;
  }


  public async done(req: Request, res: Response): Promise<StatusView> {
    console.log(await this.authenticate(req, res));
    return <StatusView>{
      status: 'success',
      description: '',
      data: null
    };
  }
}
