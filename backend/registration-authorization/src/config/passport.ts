import { Application } from 'express';
import passport from 'passport';
import { emailStrategy } from '../passportStrategy/emailStrategy';
import { vkontakteStrategy } from '../passportStrategy/vkontakteStrategy';


export function passportInitialization(server: Application) {
  server.use(passport.initialize());
}


export const configStrategyVkontakte = {
  clientID: <string>global.process.env.VKONTAKTE_CLIENT_ID,
  clientSecret: <string>global.process.env.VKONTAKTE_CLIENT_SECRET,
  callbackURL: <string>global.process.env.VKONTAKTE_CALLBACK_URL
}


passport.use('email', emailStrategy());
passport.use('vkontakte', vkontakteStrategy());
