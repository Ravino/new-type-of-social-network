import axios from 'axios';
import PliziAPIError from './PliziAPIError.js';

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
     * @param {socialLogin} token
     */
    constructor($root, token){
        this.__baseURL = (window.apiURL) ? window.apiURL+``.trim() : ``;
        this.__baseWsURL = (window.wsUrl) ? window.wsUrl+``.trim() : ``;

        if (token) {
            this.token = token;
        }

        if ($root) {
            this.__$root = $root;
        }

        this.__axios = axios.create({
            baseURL : this.__baseURL,
            headers : this.__defaultHeaders
        });
    }

    get bearer(){
        return 'Bearer ' + this.__token;
    }

    /**
     * устанавливает токен для запросов
     * @param {string} jwToken
     */
    set token(jwToken) {
        this.__token = (jwToken+'').trim();
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
    get authHeaders(){
        return { headers: { Authorization: this.bearer } };
    }


    /**
     * бросает событие с именем eventName через Vue'шный $root.emit
     * @param {string} eventName
     * @param {object|boolean|null} eventData
     */
    emit(eventName, eventData){
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
     * @private
     * @param {} errResponse
     * @returns {string}
     */
    getServerMessage(errResponse){
        if (errResponse  &&  errResponse.data) {
            if (errResponse.data.message) {
                const serverMessage = (errResponse.data.message+'').trim();
                return serverMessage.trim().toUpperCase().replace(/\s/g, '_')
            }

            if (errResponse.data.messages  &&  Array.isArray(errResponse.data.messages) && errResponse.data.messages.length>0) {
                let serverMessages = [];
                errResponse.data.messages.map( mItem => serverMessages.push(mItem) );
                return serverMessages.join('\r\n').trim();
            }
        }
    }


    checkIsTokenExperis(error) {
        const srvMsg = this.getServerMessage(error.response);

        if (`TOKEN_IS_EXPIRED` === srvMsg) {
            this.emit(`api:Unauthorized`, {
                srcMethod: `userSearch`
            });
        }
    }


    async userSearch(sText) {
        const sData = {
            search : (sText+'').trim()
        };

        let response = await this.__axios.post('/api/user/search', sData,  this.authHeaders)
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
     *
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
     * доступ к API методу api/user
     * @param {string} jwt
     * @returns {Promise|object}
     */
    async getUser(jwt) {
        if (jwt  &&  jwt!==``) {
            this.token = jwt;
        }

        let response = await this.__axios.get('api/user', this.authHeaders)
            .catch((error) => {
                throw new PliziAPIError(`infoUser`, error.response);
            });

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }


    async infoUser(id) {
        let response = await this.__axios.get('api/user/'+id, this.authHeaders)
            .catch((error) => {
                throw new PliziAPIError(`infoUser`, error.response);
            });

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }

    /**
     * Update user data.
     * @param user_data
     * @returns {Promise}
     */
    async updateUser(user_data) {
        let response = await this.__axios.patch('api/user', user_data, this.authHeaders)
            .catch((error) => {
                throw new PliziAPIError(`updateUser`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    /**
     * загружает список диалогов (чатов) у юзера
     * @returns {object[]|null} - список диалогов юзера, или NULL если их нет
     */
    async chatDialogs() {
        let response = await this.__axios.get('api/chat/dialogs',  this.authHeaders).catch((error) => {
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
     * @param {number} dialogID -
     * @returns {object[]|null} - список сообщений в диалоге, или NULL если была ошибка
     */
    async chatMessages(dialogID) {
        let response = await this.__axios.get('api/chat/messages/'+(dialogID >>> 0),  this.authHeaders).catch((error) => {
            this.checkIsTokenExperis(error);
            throw new PliziAPIError(`chatMessages`, error.response);
        });

        if (response.status === 200) {
            return response.data.list;
        }

        return null;
    }
}

export { PliziAPI as default}
