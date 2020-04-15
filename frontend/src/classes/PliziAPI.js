import axios from 'axios';
import PliziAPIError from './PliziAPIError.js';
import {HTTPer} from "../httper/httper";

class PliziAPI {

    /**
     * @type {AxiosInstance}
     * @private
     */
    __axios = null;

    /**
     * ссылка на Vue'шный $root
     * @type {Vue|null}
     * @private
     */
    __$root = null;

    /**
     * токен авторизации которые возвращает нам наш серверный API после логина
     * @type {string}
     * @private
     */
    __token = ``;

    /**
     * базовый URL для доступа к API по HTTP
     * @type {string}
     * @private
     */
    __baseURL = ``;

    /**
     * базовый URL для доступа к API по WebSockets
     * @type {string}
     * @private
     */
    __baseWsURL = ``;

    __defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
    };


    /**
     *
     * @param {string} token
     */
    /**
     *
     * @param {Vue} $root
     * @param {string} token
     */
    constructor($root, token) {
        this.__baseURL = (window.apiURL) ? window.apiURL + ``.trim() : ``;
        this.__baseWsURL = (window.wsUrl) ? window.wsUrl + ``.trim() : ``;

        if (token) {
            this.token = token;
        }

        if ($root) {
            this.__$root = $root;
        }

        this.__axios = axios.create({
            baseURL: this.__baseURL,
            headers: this.__defaultHeaders
        });
    }

    /**
     * геттер для получения header'а bearer
     * @returns {string} - Bearer вместе с токеном
     */
    get bearer() {
        return 'Bearer ' + this.__token;
    }

    /**
     * устанавливает токен для запросов
     * @param {string} jwToken
     */
    set token(jwToken) {
        this.__token = (jwToken + '').trim();
    }

    /**
     * @returns {string} - токен для запросов
     */
    get token() {
        return this.__token;
    }

    /**
     * геттер для упрощения получения заголовков с токеном авторизации
     * @returns {Object}
     */
    get authHeaders() {
        return {headers: {Authorization: this.bearer}};
    }


    /**
     * бросает событие с именем eventName через Vue'шный $root.emit
     * @private
     * @param {string} eventName
     * @param {object|boolean|null} eventData
     */
    emit(eventName, eventData) {
        if (this.__$root)
            return this.__$root.$emit(eventName, eventData || {});
    }


    /**
     * @param email
     * @param password
     * @returns {Promise}
     */
    async login(email, password) {
        let loginData = {
            email: email.trim(),
            password: password.trim()
        };

        return await this.__axios.post('api/login', loginData)
            .catch((error) => {
                throw new PliziAPIError(`login`, error.response);
            });
    }

    /**
     * попытка регистрации пользователя
     * @public
     * @param {object} regData - регистрационные данные
     * @returns {Promise} - промис для обработки
     */
    async register(regData) {
        return await this.__axios.post('api/register', regData)
            .catch((error) => {
                throw new PliziAPIError(`register`, error.response);
            });
    }


    /**
     * доступ к API методу api/user
     * @public
     * @param {string} jwt - токен авторизации, если не задан, используется тот что был определён ранее
     * @returns {Promise|object}
     */
    async getUser(jwt) {
        if (jwt && jwt !== ``) {
            this.token = jwt;
        }

        let response = await this.__axios.get('api/user', this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`getUser`, error.response);
            });

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }


    /**
     * получение детальной информации о юзере
     * @public
     * @param {number} id - числовой ID юзера
     * @returns {Object|null} - объект с данными юзера
     */
    async infoUser(id) {
        let response = await this.__axios.get('api/user/' + id, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`infoUser`, error.response);
            });

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }


    /**
     * обновление данных юзера
     * @public
     * @param {Object} userData - данные юзера
     * @returns {Promise}
     */
    async updateUser(userData) {
        let response = await this.__axios.patch('api/user', userData, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`updateUser`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    /**
     * загружает аватарку юзера
     * @param {formData} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async userProfileImage(formData) {
        let config = this.authHeaders;

        config.headers[`Content-Type`] = 'multipart/form-data';

        let response = await this.__axios.post('/api/user/profile/image', formData, config)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`userProfileImage`, error.response);
            });

        if (response.status === 200) {
            return response;
        }

        return null;
    }


    /**
     * поиск по юзерам
     * @public
     * @param sText - строка поиска
     * @returns {object[]|null} - коллеция с найденными юзерами или null как ещё один признак ошибки
     */
    async userSearch(sText) {
        const sData = (sText + '').trim();

        let response = await this.__axios.get('/api/user/search/' + sData, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`userSearch`, error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    /**
     * отправляет приграшение дружбы
     * поле status в ответе:
     * 200 - инвайт отправили
     * 422 - инвайт отправляли ранее
     * @param {number} potentialFriendID - ID юзера с которым хотим подружиться
     * @returns {{ status: number, message: string }}
     * @throws PliziAPIError
     */
    async sendFriendshipInvitation(potentialFriendID) {
        const data = {
            userId: potentialFriendID
        };

        return await this.__axios.post('/api/user/friendship', data, this.authHeaders)
            .catch((error) => {
                /** @TGA так сервер ответчает, что инвайт уже отправлялся **/
                if (error.response.status === 422) {
                    return {
                        status: 422,
                        message: error.response.data.message
                    }
                } else {
                    this.checkIsTokenExperis(error);
                    throw new PliziAPIError(`sendFriendshipInvitation`, error.response);
                }
            });
    }


    /**
     * @public
     * @param {string} provider
     * @param {string} token
     * @returns {Promise}
     */
    async socialLogin(provider, token) {
        return this.__axios.post(`/api/sociallogin/${provider}`, {
            token: token,
        });
    }


    /**
     * загружает список диалогов (чатов) у юзера
     * @public
     * @returns {object[]|null} - список диалогов юзера, или NULL если их нет
     */
    async chatDialogs() {
        let response = await this.__axios.get('api/chat/dialogs', this.authHeaders).catch((error) => {
            this.checkIsTokenExperis(error);
            throw new PliziAPIError(`chatDialogs`, error.response);
        });

        if (response.status === 200) {
            return response.data.list;
        }

        return null;
    }


    /**
     * загружает список сообщений (переписку) в определённом диалоге чата
     * @public
     * @param {number} dialogID - ID диалога
     * @returns {object[]|null} - список сообщений в диалоге, или NULL если была ошибка
     */
    async chatMessages(dialogID) {
        let response = await this.__axios.get('api/chat/messages/' + (dialogID >>> 0), this.authHeaders).catch((error) => {
            this.checkIsTokenExperis(error);
            throw new PliziAPIError(`chatMessages`, error.response);
        });

        if (response.status === 200) {
            return response.data.list;
        }

        return null;
    }


    /**
     * получаем список френдов, свой или другого юзера
     * @param {number|null} userID - ID юзера чей список друзей хотим получить
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async friendsList(userID) {
        let path = 'api/user/friendship';
        if (path && (userID >>> 0) !== 0) {
            path = `api/user/${userID}/friendship`;
        }

        let response = await this.__axios.get(path, this.authHeaders).catch((error) => {
            this.checkIsTokenExperis(error);
            throw new PliziAPIError(`friendsList`, error.response);
        });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    async notificationsList() {
        let response = await this.__axios.get('api/user/notifications', this.authHeaders).catch((error) => {
            this.checkIsTokenExperis(error);
            throw new PliziAPIError(`notificationsList`, error.response);
        });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }

    /**
     * получение постов для ленты
     * @public
     * @returns {Promise}
     * FIXME: возвращается или object[] или null
     * или бросается ошибка PliziAPIError
     * @throws PliziAPIError
     */
    // FIXME: раз мы делаем GET api/user/posts то им метод должен называться getPosts
    // посты будутне только на странице "Лента новостей"
    async getNews() {
        let response = await this.__axios.get('api/user/posts', this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`getNews`, error.response);
            });

        if (response.status === 200) {
            // FIXME: возвращать лучше уже response.data.data.list
            // чем меньше клиенты будут знать о внутрянке, тем лучше
            // если бэкенд поменяет формат выдачи - будешь переписывать везде где вызываешь этот метод?
            return response.data;
        }

        return null;
    }

    async recoveryPassword(email) {
        return await this.__axios.post('api/password/email', {email})
            .catch((error) => {
                this.checkIsTokenExperis(error);
                throw new PliziAPIError(`recoveryPassword`, error.response);
            });
    }

    /**
     **************************************************************************
     * Private section
     **************************************************************************
     */

    /**
     * @private
     * @param {Object} errResponse
     * @returns {string}
     */
    getServerMessage(errResponse) {
        if (errResponse && errResponse.data) {
            if (errResponse.data.message) {
                const serverMessage = (errResponse.data.message + '').trim();
                return serverMessage.trim().toUpperCase().replace(/\s/g, '_')
            }

            if (errResponse.data.messages && Array.isArray(errResponse.data.messages) && errResponse.data.messages.length > 0) {
                let serverMessages = [];
                errResponse.data.messages.map(mItem => serverMessages.push(mItem));
                return serverMessages.join('\r\n').trim();
            }
        }
    }


    /**
     * если в ответе сервер вернул, что `Token is expired`, то бросит событие `api:Unauthorized`
     * @private
     * @param {Object} error - ответ сервера с ошибкой в том виде как возвращает axios
     * @throws {Event} - событие `api:Unauthorized`
     */
    checkIsTokenExperis(error) {
        const srvMsg = this.getServerMessage(error.response);

        if (`TOKEN_IS_EXPIRED` === srvMsg) {
            this.emit(`api:Unauthorized`, {
                srcMethod: `userSearch`
            });
        }
    }
}

export {PliziAPI as default}
