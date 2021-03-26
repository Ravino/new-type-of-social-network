import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { EmailResolver } from '../resolver/emailResolver';
import { StatusView } from '../view/statusView';


export class EmailRouter {

  public handler(req: Request, res: Response) {
    const result: StatusView = Container.get(EmailResolver).done(req, res);
    res.json(result);
    return undefined;
  }
}
