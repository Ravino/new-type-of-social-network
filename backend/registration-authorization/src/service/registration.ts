import { AbstractRegistrationAuthorization } from './abstractRegistrationAuthorization';


export class Registration extends AbstractRegistrationAuthorization {

  public validateFirstname(firstname: string): boolean {
    return true;
  }


  public validateLastname(lastname: string): boolean {
    return true;
  }
}
