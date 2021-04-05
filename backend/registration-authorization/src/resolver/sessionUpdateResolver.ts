import { Inject } from 'typescript-ioc';
import trim from 'trim';
import { AuthorizationService } from '../service/authorizationService';
import { SessionService } from '../service/sessionService';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class SessionUpdateResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly authorizationService: AuthorizationService,
    @Inject private readonly sessionService: SessionService,
  ){}


  public async update(req: Request, res: Response): Promise<any> {

    let currentRefreshToken: string = req.body.refreshToken || '';
    let currentAccessToken: string = req.body.accessToken || '';


    currentRefreshToken = trim(currentRefreshToken);
    currentAccessToken = trim(currentAccessToken);


console.log(req.body);
    let bindToken: string;
    try {
      bindToken = await this.authorizationService.bindToken(currentRefreshToken, currentAccessToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


console.log('bind token ' + bindToken);
    let existSession: any;
    try {
      existSession = await this.sessionService.getByNameField('bind_token', bindToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    if(!existSession) {
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    let pairToken: any;
    try {
      pairToken = await this.authorizationService.getPairToken(existSession);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    try {
      bindToken = await this.authorizationService.bindToken(pairToken.refreshToken, pairToken.accessToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    let result: boolean;
    try {
      result = await this.sessionService.update(existSession.SESSION_ID, existSession.SCOPE, existSession.BIND_TOKEN, bindToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    if(!result) {
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    this.statusView.addStatus('success');
    this.statusView.addData(pairToken);
    return this.statusView;
  }





  public async done(req: Request, res: Response): Promise<any> {
    const result = await this.update(req, res);
    res.json(result);
  }
}
