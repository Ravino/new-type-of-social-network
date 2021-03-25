import {Principal} from "./oauth";

declare global {
    declare namespace Express {
        export interface Request {
            /**
             * Содержит информацию о текущем пользователе.
             */
            principal?: Principal,
            /**
             * Указывает если данный запрос был выполнен авторизованным и валидным пользователем.
             */
            authenticated: boolean,
            /**
             * Метод позволяет проверить если текущий запрос выполняется авторизованным пользователем в указанных scope-ах.
             * @param scopes
             */
            isScope: (...scopes: string[]) => boolean,
            /**
             * Метод позволяет определить если авторизованный пользователь имеет нужные роли.
             * @param roles
             */
            isRole: (...roles: string[]) => boolean
        }
    }
}
