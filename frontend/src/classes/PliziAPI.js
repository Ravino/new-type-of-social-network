import axios from 'axios';
import PliziAPIError from './PliziAPIError.js';

class PliziAPI {

    /**
     * @type {AxiosInstance}
     * @private
     */
    __axios = null;

    __token = ``;

    __baseURL = null;

    __defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
    };


    /**
     *
     * @param {string} token
     */
    constructor(token){
        this.__baseURL = window.apiURL;

        if (token) {
            this.token = token;
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

    get authHeaders(){
        return { headers: { Authorization: this.bearer } };
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
     * загружает список диалогов (чатов) у юзера
     * @returns {object[]|null} - список диалогов юзера, или NULL если их нет
     */
    async chatDialogs() {
        let response = await this.__axios.get('api/chat/dialogs',  this.authHeaders).catch((error) => {
            throw new PliziAPIError(`chatDialogs`, error.response);
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    async userSearch(sText) {
        const sData = {
            search : (sText+'').trim()
        };

        let response = await this.__axios.post('/api/user/search', sData,  this.authHeaders)
            .catch((error) => {
                throw new PliziAPIError(`userSearch`, error.response);
            });

        if (response.status === 200) {
            return response.data;
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

}

export { PliziAPI as default}
