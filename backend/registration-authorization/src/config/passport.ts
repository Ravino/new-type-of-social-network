import { Application } from 'express';
import passport from 'passport';
import emailStrategy from '../passportStrategy/emailStrategy';


passport.use('email', emailStrategy);


export function passportInitialization(server: Application) {
  server.use(passport.initialize());
}
