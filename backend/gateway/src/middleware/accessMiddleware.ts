import trim from 'trim';
import { confSetCookie } from '../config/cookieParser';
import { Request, Response, NextFunction } from 'express';
import { StatusView } from '../view/statusView';


export class AccessMiddleware {

  private readonly statusView: StatusView = new StatusView();


  public checkExistSession(req: Request, res: Response, next: NextFunction): any {

    let accessToken: string = req.signedCookies[confSetCookie.nameCookie] || '';
    accessToken = trim(accessToken);


    if(accessToken) {
      next();
      return undefined;
    }


    this.statusView.addStatus('notAuthenticate');
    res.json(this.statusView);
    return undefined;
  }


  public stub(req: Request, res: Response, next:NextFunction): any {
    res.sendStatus(403)
    return undefined;
  }
}
