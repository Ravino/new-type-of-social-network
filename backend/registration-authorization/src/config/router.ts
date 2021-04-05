import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { SigninRouter } from '../router/signinRouter';
import { SessionRouter } from '../router/sessionRouter';
import { RecoveryRouter } from '../router/recoveryRouter';
import { VerificationRouter } from '../router/verificationRouter';


const router: Router = Router();


router.use('/signin',
  Container.get(SigninRouter).handler()
);


router.use('/session',
  Container.get(SessionRouter).handler()
);


router.use('/recovery',
  Container.get(RecoveryRouter).handler()
);


router.use('/verification',
  Container.get(VerificationRouter).handler()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
