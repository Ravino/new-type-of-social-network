import passwordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';


export abstract class AbstractRegistrationAuthorizationService {

  public validateEmail(email: string): boolean {
    const result: boolean = EmailValidator.validate(email);
    return result;
  }


  public validatePassword(password: string): boolean {
    return true;
  }


  public generatePassword(): string {
    return '';
  }
}
