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


  public async authenticate(req: Request, res: Response): Promise<StatusView> {

    let result: string = '';


    authenticatePassport('email', (err, user, info) => {

      if(err) {
        result = 'error';
//        return undefined;
      }


      if(info) {
        result = info.message;
//        return undefined;
      }


      result = 'success';
//      return undefined;
    })(req, res);


    this.statusView.addStatus('success');
    return this.statusView;
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
      existUser = await this.userService.getByEmail(email);
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


  public async done(req: Request, res: Response, next: any): Promise<StatusView> {

    if(req.body.method == 'registration') {
      return await this.registrate(req, res);
    }


    if(req.body.method == 'authentication') {
      return await this.authenticate(req, res);
    }


    this.statusView.addStatus('notSuccess');
    return this.statusView;
  }
}
