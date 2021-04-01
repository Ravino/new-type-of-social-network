import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { EmailResolver } from '../resolver/emailResolver';
import { StatusView } from '../view/statusView';


export class EmailRouter {

  public async handler(req: Request, res: Response, next: any): Promise<undefined> {
    res.json(await Container.get(EmailResolver).done(req, res, next));
    return undefined;
  }
}
