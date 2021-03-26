import { Inject } from 'typescript-ioc';
import { UserService } from './userService';
import argon2 from 'argon2';
import { generate as genPasswd } from 'generate-password';
import PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';


export abstract class AbstractRegistrationAuthorizationService {

  public constructor(
    @Inject private readonly userService: UserService
  ) {}


  public validateEmail(email: string): boolean {
    const result: boolean = EmailValidator.validate(email);
    return result;
  }


  public validatePassword(password: string): boolean {

    const schema: PasswordValidator = new PasswordValidator();
    schema
    .is().min(8)
    .is().max(124)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces();


    const result: boolean = <boolean>schema.validate(password);
    return result;
  }


  public generatePassword(): string {
    const passwd: string = genPasswd({
      length: 15,
      numbers: true
    });


    return passwd;
  }


  public async hashPassword(password: string): Promise<string> {
    const result = await argon2.hash(password);
    return result;
  }
}
