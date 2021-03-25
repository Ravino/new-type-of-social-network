import { Request } from 'express';
import { Response } from 'express';


export class Local {
  public constructor() {}
  public middleware(req: Request, res: Response, next: any) {
    next();
    return undefined;
  }
  public resolver(req: Request, res: Response) {

    res.send("hello world");


    return undefined;
  }
}
