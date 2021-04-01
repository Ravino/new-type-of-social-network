import { Container } from 'typescript-ioc';
import { configStrategyVkontakte } from '../config/passport';
import { AuthorizationService } from '../service/authorizationService';
import { Strategy } from 'passport-vkontakte';


export const vkontakteStrategy = () => new Strategy(configStrategyVkontakte, (accessToken: string, refreshToken: string, params: any, profile: any, done: any) => {

/*
  console.log(accessToken);
  console.log(refreshToken);
  console.log(params);
  console.log(profile);
*/
  done(null, true);
})
