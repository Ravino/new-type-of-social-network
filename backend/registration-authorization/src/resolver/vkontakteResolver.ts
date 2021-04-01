import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class VkontakteResolver {

  public constructor(
  ){}


  public async authenticate(req: Request, res: Response, next: any): Promise<string> {

    authenticatePassport('vkontakte', (err, user, info) => {
      console.log(err);
      console.log(user);
      console.log(info);
      console.log('test auth vk');
    })(req, res, next);


    return '';
  }


  public async done(req: Request, res: Response, next: any) {
        this.authenticate(req, res, next);
  }
}
