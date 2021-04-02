import { promisify } from 'util';
import { Inject } from 'typescript-ioc';
import escapeHtml from 'escape-html';
import trim from 'trim';
import { UserService } from '../service/userService';
import { RegistrationService } from '../service/registrationService';
import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class EmailResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly userService: UserService,
    @Inject private readonly registrationService: RegistrationService
  ){}


  public async authenticate(req: Request, res: Response): Promise<any> {

    authenticatePassport('email', (err, pairToken, info) => {

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


  public async registrate(req: Request, res: Response): Promise<StatusView> {

    let firstname: string = escapeHtml(req.body.firstname || '');
    let lastname: string = escapeHtml(req.body.lastname || '');
    let email: string = escapeHtml(req.body.email || '');


    firstname = trim(firstname);
    lastname = trim(lastname);
    email = trim(email);


    const confirm: boolean = false;
    const validateEmail: boolean = this.registrationService.validateEmail(req.body.email);


    let existUser: any;
    try {
      existUser = await this.userService.getByNameField('email', email);
    }
    catch(err) {
      console.log(err);
    }


    if(existUser) {
      this.statusView.addStatus('existUser');
      return this.statusView;
    }


    const password = this.registrationService.generatePassword();
    const hash = await this.registrationService.hashPassword(password);


    try {
      await this.userService.create(firstname, lastname, hash, confirm, email, null);
    }
    catch(err) {
      console.log(err);
    }


    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response, next: any): Promise<any> {

    if(req.body.method == 'registration') {
      const result = await this.registrate(req, res);
      res.json(result);
      return undefined;
    }


    if(req.body.method == 'authentication') {
      await this.authenticate(req, res);
      return undefined;
    }


    this.statusView.addStatus('notSuccess');
    return this.statusView;
  }
}
