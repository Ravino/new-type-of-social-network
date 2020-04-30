import axios from 'axios';
import PliziAPIError from './API/PliziAPIError.js';

import PliziChatAPI from './API/PliziChatAPI.js';
import PliziPostAPI from './API/PliziPostAPI.js';
import PliziFriendAPI from './API/PliziFriendAPI.js';

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
     * токен авторизации, который возвращает нам наш серверный API после логина
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

    __defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
    };

    /**
     * токен канала, который возвращает нам наш серверный API после логина
     * @type {string}
     * @private
     */
    __channel = ``;

    /**
     * базовый URL для доступа к API по WebSockets
     * @type {string}
     * @private
     */
    __baseWsURL = ``;

    __wsChannelCarrier = null;

    __wsIsConnected = false;

    __wsChannelOptions = {
        maxRetries: 10,
        retryDelay: 4000,
        skipSubprotocolCheck: true
    };

    /**
     * @type {PliziChatAPI}
     * @private
     */
    __chat = null;

    /**
     * @type {PliziPostAPI}
     * @private
     */
    __post = null;

    /**
     * @type {PliziFriendAPI}
     * @private
     */
    __friend = null;


    /**
     * @param {Vue} $root - ссылка на Vue объект, который вызывает этот конструктор
     */
    constructor($root) {
        this.__baseURL   = (window.apiURL) ? (window.apiURL + ``).trim() : ``;
        this.__baseWsURL = (window.wsUrl) ? (window.wsUrl + ``).trim() : ``;

        if ($root) {
            this.__$root = $root;
        }

        this.__axios = axios.create({
            baseURL: this.__baseURL,
            headers: this.__defaultHeaders
        });

        this.__chat = new PliziChatAPI(this);
        this.__post = new PliziPostAPI(this);
        this.__friend = new PliziFriendAPI(this);
    }


    /**
     * @returns {PliziChatAPI}
     */
    get $chat() {
        return this.__chat;
    }

    /**
     * @returns {PliziPostAPI}
     */
    get $post() {
        return this.__post;
    }

    /**
     * @returns {PliziFriendAPI}
     */
    get $friend() {
        return this.__friend;
    }

    get axios() {
        return this.__axios;
    }


    /**
     * устанавливает токен для запросов
     * @param {string} jwToken
     */
    set token(jwToken) {
        //if (jwToken === ``) {
        //    window.console.warn(`API: try to set empty token!`);
        //}

        this.__token = (jwToken + '').trim();
    }

    /**
     * @returns {string} - токен для запросов
     */
    get token() {
        return this.__token;
    }


    set channel(cnl){
        //if (cnl === ``) {
        //    window.console.warn(`Try to set empty channel`);
        //}

        this.__channel = (cnl+'').trim();
    }


    get channel(){
        return this.__channel;
    }

    /**
     * пытаемся законнектится к WebSocket каналу
     * @param {string} cnlToken
     */
    connectToChannel(cnlToken){
        if (cnlToken !==``){
            this.__channel = cnlToken;
        }

        this.__tryConnectToWebSocketsChannel();
    }


    /**
     * метод для упрощения получения заголовков
     * @returns {{headers: {Authorization: string}}}
     * @private
     */
    __getAuthHeaders() {
        return {
            headers: {
                Authorization: this.__getBearer()
            }
        };
    }


    get authHeaders() {
        return this.__getAuthHeaders();
    }


    /**
     * метод для упрощения получения заголовков для отправки файлов
     * @returns {{headers: {Authorization: string, "Content-Type": string}}}
     * @private
     */
    __getAuthFileHeaders() {
        return {
            headers: {
                'Content-Type'  : 'multipart/form-data',
                'Authorization' : this.__getBearer()
            }
        };
    }

    get authFileHeaders(){
        return this.__getAuthFileHeaders();
    }

    /**
     * геттер для получения header'а bearer
     * @returns {string} - Bearer вместе с токеном
     */
    __getBearer() {
        if (this.token === ``) {
            window.console.warn(`API:getBearer - token is empty!`);

            throw new PliziAPIError(`getBearer`, {});
        }

        return 'Bearer ' + this.__token;
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
     * Регистрация через соц. сети.
     * @param provider
     * @param token
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async registerThroughSocialServices(provider, token) {
        let response = await this.__axios.post(`/api/sociallogin/${provider}`, {token})
            .catch((error) => {
                throw new PliziAPIError(`registerThroughSocialServices`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
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

        let response = await this.__axios.get('api/user', this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `getUser`);
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
        let response = await this.__axios.get('api/user/' + id, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `infoUser`);
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
        let response = await this.__axios.patch('api/user', userData, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `updateUser`);
                throw new PliziAPIError(`updateUser`, error.response);
            });

        if (response.status === 200) {
            return response.data.data;
        }

        return null;
    }

    async updateUserPrivacy(privacyData) {
        let response = await this.__axios.patch('api/user/privacy', privacyData, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `updateUserPrivacy`);
                throw new PliziAPIError(`updateUserPrivacy`, error.response);
            });

        if (response.status === 200) {
            return response.data.data;
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
        let config = this.__getAuthHeaders();

        config.headers[`Content-Type`] = 'multipart/form-data';

        let response = await this.__axios.post('/api/user/profile/image', formData, config)
            .catch((error) => {
                this.__checkIsTokenExperis(error, `userProfileImage`);
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

        let response = await this.__axios.get('/api/user/search/' + sData, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `userSearch`);
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

        return await this.__axios.post('/api/user/friendship', data, this.__getAuthHeaders())
            .catch((error) => {
                /** @TGA так сервер ответчает, что инвайт уже отправлялся **/
                if (error.response.status === 422) {
                    return {
                        status: 422,
                        message: error.response.data.message
                    }
                } else {
                    this.__checkIsTokenExperis(error, `sendFriendshipInvitation`);
                    throw new PliziAPIError(`sendFriendshipInvitation`, error.response);
                }
            });
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

        let response = await this.__axios.get(path, this.__getAuthHeaders()).catch((error) => {
            this.__checkIsTokenExperis(error, `friendsList`);
            throw new PliziAPIError(`friendsList`, error.response);
        });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    async friendshipStop(friendID) {
        const sendData = {
            userId: friendID
        };

        let response = await this.__axios.post('/api/user/friendship/remove', sendData, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `invitationDecline`);
                throw new PliziAPIError(`invitationDecline`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    async friendsPotential() {
        const sData = `@`;

        let response = await this.__axios.get('/api/user/search/' + sData, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `friendsPotential`);
                throw new PliziAPIError(`friendsPotential`, error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    /**
     * получаем список приглашений дружбы
     * @returns {object[]|null} - список инвайтов или NULL
     * @throws PliziAPIError
     */
    async invitationsList() {
        let path = 'api/user/friendship/pending';

        let response = await this.__axios.get(path, this.__getAuthHeaders()).catch((error) => {
            this.__checkIsTokenExperis(error, `invitationsList`);
            throw new PliziAPIError(`invitationsList`, error.response);
        });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    async invitationAccept(friendID) {
        const sendData = {
            userId: friendID
        };

        let response = await this.__axios.post('api/user/friendship/accept', sendData, this.__getAuthHeaders()).catch((error) => {
            this.__checkIsTokenExperis(error, `invitationAccept`);
            throw new PliziAPIError(`invitationAccept`, error.response);
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    async invitationDecline(friendID) {
        const sendData = {
            userId: friendID
        };

        let response = await this.__axios.post('api/user/friendship/decline', sendData, this.__getAuthHeaders()).catch((error) => {
            this.__checkIsTokenExperis(error, `invitationDecline`);
            throw new PliziAPIError(`invitationDecline`, error.response);
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    async notificationsList() {
        let response = await this.__axios.get('api/user/notifications', this.__getAuthHeaders()).catch((error) => {
            this.__checkIsTokenExperis(error, `notificationsList`);
            throw new PliziAPIError(`notificationsList`, error.response);
        });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Отправка запроса на восстановление пароля.
     * @param email
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async recoveryPassword(email) {
        let response = await this.__axios.post('api/password/email', {email})
            .catch((error) => {
                throw new PliziAPIError(`recoveryPassword`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }

    /**
     * Обновление пароля.
     * @param formData
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async resetPassword(formData) {
        let response = await this.__axios.post('api/password/reset', formData)
            .catch((error) => {
                throw new PliziAPIError(`updatePassword`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }

    /**
     * Обновление пароля на странице профиля.
     * @param formData
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async changePassword(formData) {
        let response = await this.__axios.post('api/user/password/change', formData, this.__getAuthHeaders())
            .catch((error) => {
                throw new PliziAPIError(`changePassword`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }

    /**
     * Получение списка локаций по аргументу.
     * @param location
     * @returns {object[]|null}
     */
    async getLocationsByInput(location) {
        let response = await this.__axios.get(`api/city/search?search=${location}`, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `getLocationsByInput`);
                throw new PliziAPIError(`getLocationsByInput`, error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
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
     **************************************************************************
     * Private section
     **************************************************************************
     */

    __tryConnectToWebSocketsChannel(){
        if (this.__wsIsConnected)
            return;

        setTimeout(()=>{
            if(this.channel !== ``) {
                this.__wsRealConnect();
            }
            else {
                this.__tryConnectToWebSocketsChannel();
            }
        }, 500);
    }

    __s = null;

    __wsRealConnect(){
        const channelOptions = {
            maxRetries: 10,
            retryDelay: 4000,
            skipSubprotocolCheck: true
        };

        this.__wsChannelCarrier = new ab.connect(this.__baseWsURL,
            (s)=>{this.__s = s; this.__channelReceiver(s)},
            (code, reason, detail)=>{this.__channelErrorHandler(code, reason, detail)},
            channelOptions
        );

        this.__wsIsConnected = true;
    }


    __channelReceiver(s) {
        s.subscribe(this.__channel, (channelID, data) => {
            window.console.dir(data, 'from WS');

            if (channelID=== this.channel  &&  `message.new`===data.event_type) {
                this.emit('newMessageInDialog', {
                    chatId :  data.data.chatId,
                    message : data.data
                });
            }

            if (channelID=== this.channel  &&  `message.deleted`===data.event_type) {
                this.emit('removeMessageInDialog', {
                    chatId :  data.data.chatId,
                    messageId : +data.data.messageId,
                });
            }
            if (channelID=== this.channel  &&  `user.typing`===data.event_type) {
                this.emit('userIsTyping', {
                    chatId :  data.chatId,
                    user : data.data,
                });
            }
        });
    }

    /** @param {object} sendData **/
    sendToChannel(sendData) {
        sendData.token = this.__token;
        this.__s.call('user.typing', sendData);
    }

    __channelErrorHandler(code, reason, detail){
        //window.console.warn(`__channelErrorHandler`);
        //window.console.log(code, `code`);
        //window.console.log(reason, `reason`);
        //window.console.log(detail, `detail`);

        window.console.info(`${code}: ${reason} ${(detail || '')}`);
    }


    /**
     * @private
     * @param {Object} errResponse
     * @returns {string}
     */
    __getServerMessage(errResponse) {
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
     * @param {string} srcMethod - имя API-метода, который вызвал ошибку
     * @throws {Event} - событие `api:Unauthorized`
     */
    __checkIsTokenExperis(error, srcMethod) {
        const srvMsg = this.__getServerMessage(error.response);

        if (`TOKEN_IS_EXPIRED` === srvMsg) {
            this.emit(`api:Unauthorized`, {
                srcMethod: srcMethod || `pliziAPI`
            });
        }
    }


    checkIsTokenExpires(error, srcMethod) {
        return this.__checkIsTokenExperis(error, srcMethod);
    }

}

export {PliziAPI as default}
