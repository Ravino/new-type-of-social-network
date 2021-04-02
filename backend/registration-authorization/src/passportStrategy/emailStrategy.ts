import { Container } from 'typescript-ioc';
import escapeHtml from 'escape-html';
import trim from 'trim';
import { AuthorizationService } from '../service/authorizationService';
import { UserService } from '../service/userService';
import { Strategy } from 'passport-local';


export const emailStrategy = () => new Strategy(async (email: string, password: string, done: any) => {

  email = escapeHtml(email || '');
  password = escapeHtml(password);


  email = trim(email);
  password = trim(password);


  if(!Container.get(AuthorizationService).validateEmail(email)) {
    done(null, false, { message: 'invalidEmail'});
    return undefined;
  }


  if(!Container.get(AuthorizationService).validatePassword(password)) {
    done(null, false, { message: 'invalidPassword'});
    return undefined;
  }


  let existUser: any;
  try {
    existUser = await Container.get(UserService).getByEmail(email);
  }
  catch(err) {
    console.log(err);
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  if(!existUser) {
    done(null, false, { message: 'notExistUser'});
    return undefined;
  }


  let statusVerifyPassword: boolean = false;
  try {
    statusVerifyPassword = await Container.get(AuthorizationService).verifyPassword(password, existUser.PASSWORD);
  }
  catch(err) {
    console.log(err);
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  done(null, true, {message: 'success'});
  return undefined;
})
