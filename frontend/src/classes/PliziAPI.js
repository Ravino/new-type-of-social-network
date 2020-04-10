import axios from 'axios';

class PliziAPI {

    constructor(token){
        this.__axios = null;

        this.__token = ``;

        this.__baseURL = null;

        this.__defaultHeaders = {
            'X-Requested-With': 'XMLHttpRequest',
        };

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

    set token(jwToken) {
        this.__token = (jwToken+'').trim();
    }

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
     *
     * @param regData
     * @returns {Promise}
     */
    register(regData) {
        return this.__axios.post('api/register', regData);
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
        this.token = jwt;

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

}

export { PliziAPI as default}
