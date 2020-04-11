import axios from 'axios';

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
    login(email, password) {
        let loginData = {
            email: email.trim(),
            password: password.trim()
        };

        return this.__axios.post('api/login', loginData);
    }

    /**
     * попытка регистрации пользователя
     * @param {object} regData - регистрационные данные
     * @returns {Promise} - промис для обработки
     */
    register(regData) {
        return this.__axios.post('api/register', regData);
    }

    /**
     * загружает список диалогов (чатов) у юзера
     * @returns {object[]|null} - список диалогов юзера, или NULL если их нет
     */
    async chatDialogs() {
        let response = null;

        try {
            response = await this.__axios.get('api/chat/dialogs',  this.authHeaders);
        }
        catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString(), 'qqqqq');
            return null;
        }

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }


    async userSearch(sText) {
        let response = null;

        const sData = {
            search : (sText+'').trim()
        };

        try {
            response = await this.__axios.post('/api/user/search', sData,  this.authHeaders);
        }
        catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString(), 'qqqqq');
            return null;
        }

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
    socialLogin(provider, token) {
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

        let response = null;

        try {
            response = await this.__axios.get('api/user', this.authHeaders);
        }
        catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString());
            return null;
        }

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }


    async infoUser(id) {
        let response = null;

        try {
            response = await this.__axios.get('api/user/'+id, this.authHeaders);
        }
        catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString());
            return null;
        }

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }

}

export { PliziAPI as default}
