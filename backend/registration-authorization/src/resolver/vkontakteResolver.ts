import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class VkontakteResolver {

  private readonly statusView: StatusView = new StatusView();


  public async authenticate(req: Request, res: Response): Promise<any> {

    authenticatePassport('vkontakte', (err, pairToken, info) => {

      if(err) {
        console.log(err);
        this.statusView.addStatus('notSuccess');
        res.json(this.statusView);
        return undefined;
      }


      if(info.message == 'success') {
        this.statusView.addStatus(info.message);
        this.statusView.addData(pairToken.refreshToken);
        res.json(this.statusView);
        return undefined;
      }


      this.statusView.addStatus(info.message);
      res.json(this.statusView);
      return undefined;
    })(req, res);


    return undefined;
  }


  public async done(req: Request, res: Response): Promise<any> {
        await this.authenticate(req, res);
  }
}
