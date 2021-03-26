import { Container } from 'typescript-ioc';
import { AuthorizationService } from '../service/authorizationService';
import { Strategy } from 'passport-local';


export default new Strategy((email: string, password: string, done: any) => {

  if(!Container.get(AuthorizationService).validateEmail(email)) {
    done(null, false);
    return undefined;
  }


  if(!Container.get(AuthorizationService).validatePassword(password)) {
    done(null, false);
    return undefined;
  }


  done(null, true);
  return undefined;
})
