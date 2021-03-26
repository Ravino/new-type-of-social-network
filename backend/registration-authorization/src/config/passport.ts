import { Application } from 'express';
import passport from 'passport';
import email from '../passportStrategy/email';


passport.use(email);


export function passportInitialization(server: Application) {
  server.use(passport.initialize());
}
