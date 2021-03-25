import OAuthServer from 'express-oauth-server';
import {AuthService} from "../service/auth_service";
import {Container} from "typescript-ioc";
import {Request, RequestHandler, Router} from 'express';
import bodyParser from "body-parser";
import OAuth2Server from "oauth2-server";
import {TokenExpiredError} from "jsonwebtoken";
import {DuplicateUserError} from "../service/user_service";
import emailValidator from 'email-validator';

const AUTHORIZATION_PATTERN = /^Bearer\s+([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+)$/i;
const authService = Container.get<AuthService>(AuthService);

export const oauth = new OAuthServer({
    model: authService,
    requireClientAuthentication: true
});

export const authRoute = Router();
authRoute.use(bodyParser.urlencoded({ extended: false }));
authRoute.post('/token', oauth.token({
    requireClientAuthentication: true,
    alwaysIssueNewRefreshToken: true,
    accessTokenLifetime: 3600, // 1 hour
    refreshTokenLifetime: 30 * 24 * 3600 // 30 days
}));
authRoute.post('/applicant', bodyParser.urlencoded({extended: false}), async (req, res) => {
    try {
        if (req.body && req.body.email && req.body.password) {
            if (!req.body.email || !req.body.password || !emailValidator.validate(req.body.email)) {
                res.status(400).end();
                return;
            }

            res
                .status(201)
                .contentType('application/json')
                .send(JSON.stringify(await authService.createApplicant(req.body.email, req.body.password)));
        } else {
            res.status(400).end();
        }
    } catch (e) {
        if (e instanceof DuplicateUserError) {
            res.status(400).send(JSON.stringify({"error": e.constructor.name, "message": e.message})).end();
        } else {
            res.status(500).end();
        }
    }
});

export class PrincipalUser {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: string) {
    }
}

export class Principal {

    constructor(
        public user: PrincipalUser,
        public accessToken: string,
        public accessTokenExpiresAt: Date,
        public scopes: string[],
        public client: string) {
    }
}

export class AuthenticateOptions {
    /**
     * Определяет если даттый запрос обязательно должен быть выполнен авторизованным пользователем.
     */
    public requires?: boolean;
    /**
     * Определяет если данный запрос может выполнить только пользователь с одной из указанных ролей.
     */
    public roles?: string[];
    /**
     * Определяет если данный запрос может выполняться только с одним из указанных scope-ов.
     */
    public scopes?: string[];
}

/**
 * Позволяет выполнить логику по проверке запроса на содержание авторизации. При выполнении этого middleware-а в запрос добавляются
 * поля principal: Princial, authorized: boolean, isScope(...scopes:string[]): boolean и isRole(...roles: string[]): boolean.
 * @param options позволяет настроить параметры проверки авторизации.
 */
export function authenticate(options?: AuthenticateOptions): RequestHandler {
    let opts = Object.assign({
        requires: true
    }, options);

    return async (req, res, next) => {
        try {
            req.authenticated = false;
            req.isScope = (...x: string[]) => isScope(req, x);
            req.isRole = (...x: string[]) => isRole(req, x);

            if (!req.headers.authorization || !AUTHORIZATION_PATTERN.test(req.headers.authorization)) {
                if (opts.requires) {
                    res.status(401).end();
                    return;
                }
            } else {
                let authorization: string = <string>req.headers.authorization;
                let m: RegExpExecArray = <RegExpExecArray>AUTHORIZATION_PATTERN.exec(authorization);
                let token: string = m[1];

                let principalOpt: OAuth2Server.Token | OAuth2Server.Falsey = await authService.getAccessToken(token);
                if (opts.requires && !principalOpt) {
                    res.status(401).end();
                    return;
                }
                let principalToken: OAuth2Server.Token = <OAuth2Server.Token>principalOpt;
                let principalUser = new PrincipalUser(principalToken.user?.id, principalToken.user?.name, principalToken.user?.email, principalToken.user?.role);
                req.principal = new Principal(principalUser,
                    principalToken.accessToken,
                    <Date>principalToken.accessTokenExpiresAt,
                    typeof principalToken.scope === 'string' ? [principalToken.scope] : <string[]>principalToken.scope,
                    principalToken.client.id);

                req.authenticated = true;
                if (opts.scopes && !isScope(req, opts.scopes)) {
                    res.status(403).end();
                    return;
                }
                if (opts.roles && !isRole(req, opts.roles)) {
                    res.status(403).end();
                    return;
                }
            }
            next();
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                res.status(401).end();
            } else {
                console.error(e);
                res.status(500).end();
            }
        }
    };
}

function isScope(req: Request, scopes: string[]): boolean {
    return !!(scopes &&
        scopes.length &&
        req.principal &&
        req.principal.scopes.some(x => (<string[]>scopes).includes(x)));
}

function isRole(req: Request, roles: string[]): boolean {
    return !!(roles &&
        roles.length &&
        req.principal &&
        req.principal.user &&
        roles.includes(req.principal.user.role));
}
