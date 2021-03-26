import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { EmailResolver } from '../resolver/emailResolver';
import { StatusView } from '../view/statusView';


export class EmailRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    const result: StatusView = await Container.get(EmailResolver).done(req, res);
    res.json(result);
    return undefined;
  }
}
