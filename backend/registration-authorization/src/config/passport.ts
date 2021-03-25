import { Application } from 'express';
import passport from 'passport';


export function passportInitialization(server: Application) {
  server.use(passport.initialize());
}
