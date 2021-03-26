import { Inject } from 'typescript-ioc';
import { RegistrationService } from '../service/registrationService';
import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class EmailResolver {

  public constructor(
    @Inject private readonly registrationService: RegistrationService
  ){}


  public async authenticate(req: Request, res: Response): Promise<string> {

    let result: string = '';


    authenticatePassport('email', (err, user, info) => {

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

    if(req.body.method == 'registration') {
    }


    if(req.body.method == 'authentication') {
    }


    return <StatusView>{
      status: 'success',
      description: '',
      data: null
    };
  }
}
