import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziCommunitiesAPI extends PliziBaseAPI {

    /**
     * Получение списка сообществ
     * @param {string} searchText
     * @param {number} limit
     * @param {number} offset
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async loadCommunities(searchText = '', limit = 20, offset = 0){
        const search = searchText
            ? `?search=${searchText}&limit=${limit}&offset=${offset}`
            : `?limit=${limit}&offset=${offset}`;
        const url = 'api/communities' + search;
        let response = await this.axios.get( url, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.loadCommunities` );
                throw new PliziAPIError( `$communities.loadCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Получение списка сообществ для управления
     * @param {string} searchText
     * @param {number} limit
     * @param {number} offset
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async loadManagedCommunities(searchText = '', limit = 20, offset = 0) {
        const search = searchText
            ? `&search=${searchText}&limit=${limit}&offset=${offset}`
            : `&limit=${limit}&offset=${offset}`;
        const url = 'api/communities?list=owner' + search;
        let response = await this.axios.get(url, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.loadManagedCommunities`);
                throw new PliziAPIError(`$communities.loadManagedCommunities`, error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Получение списка сообществ пользователя.
     * @param {string} searchText
     * @param {number} limit
     * @param {number} offset
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async userCommunities(searchText = '', limit = 20, offset = 0) {
        const search = searchText
            ? `&search=${searchText}&limit=${limit}&offset=${offset}`
            : `&limit=${limit}&offset=${offset}`;
        const url = 'api/communities?list=my' + search;
        let response = await this.axios.get(url, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.userCommunities` );
                throw new PliziAPIError( `$communities.userCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }


    async getCommunity(communityID){
        let response = await this.axios.get( 'api/communities/'+communityID, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.getCommunity` );
                throw new PliziAPIError( `$communities.getCommunity`, error.response );
            });

        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }


    /**
     * создаёт новое сообщество
     * @see http://vm1095330.hl.had.pm:8082/docs/#/Communities/createCommunity
     * @param {object} formData - данные для создания
     * @returns {object|null}
     * @throws PliziAPIError
     */
    async communityCreate( formData ){
        let response = await this.axios.post( 'api/communities', formData, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, '$communities.communityCreate' );
                throw new PliziAPIError( '$communities.communityCreate', error.response );
            } );

        if ( response.status === 201 ){
            return response.data.data;
        }

        return null;
    }


    /**
     * подписываемся на сообщество
     * @see http://vm1095330.hl.had.pm:8082/docs/#/Communities/subscribeOnCommunity
     * @param {number} communityID - ID сообщества, на которое собираемся подписаться
     * @returns {object|null}
     * @throws PliziAPIError
     */
    async subscribe(communityID){
        let response = await this.axios.get( `api/communities/${communityID}/subscribe`, this.authHeaders )
            .catch( ( error ) => {
                window.console.log(error.response.status, `error.response.status`);
                /** @TGA так сервер отвечает, что юзер уже в этом сообществе **/
                if (error.response.status === 422) {
                    return {
                        status: 422,
                        message: error.response.data.message
                    }
                }
                else {
                    this.checkIsTokenExpires( error, `$communities.subscribe` );
                    throw new PliziAPIError( `$communities.subscribe`, error.response );
                }
            } );

        if ( response.status === 200 ){
            return response.data; // TODO: @TGA потом опять сделать data.data
        }

        return null;
    }


    /**
     * отписываемся от сообщества
     * @see http://vm1095330.hl.had.pm:8082/docs/#/Communities/unsubscribeFromCommunity
     * @param {number} communityID - ID сообщества, на которое собираемся подписаться
     * @returns {object|null}
     * @throws PliziAPIError
     */
    async unsubscribe(communityID){
        let response = await this.axios.get( `api/communities/${communityID}/unsubscribe`, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.unsubscribe` );
                throw new PliziAPIError( `$communities.unsubscribe`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data; // TODO: @TGA потом опять сделать data.data
        }

        return null;
    }


    /**
     * Получение постов сообщества
     * @param {number} communityID - ID сообщества, посты которого пытаемся получить
     * @param {number} limit
     * @param {number} offset
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async posts(communityID, limit, offset){
        let path = `api/communities/${communityID}/posts`;
        let qParams = '';

        if (limit && offset) {
            qParams = `?limit=${limit}&offset=${offset}`;
        }

        let response = await this.axios.get( path + qParams, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.posts` );
                throw new PliziAPIError( `$communities.posts`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Обновление данных сообщества
     * @param {string} id
     * @param {formData} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async update(id, formData) {
        let response = await this.__axios.patch('/api/communities/' + id, formData, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.update`);
                throw new PliziAPIError(`$communities.update`, error.response);
            });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return null;
    }


    /**
     * загружает аватарку сообщества
     * @param {formData} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async updatePrimaryImage(formData) {
        let response = await this.__axios.post('/api/communities/avatar', formData, this.authFileHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.updatePrimaryImage`);
                throw new PliziAPIError(`$communities.updatePrimaryImage`, error.response);
            });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return null;
    }

    /**
     * загружает аватарку сообщества
     * @param {formData} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async updateHeaderImage(formData) {
        let response = await this.__axios.post('/api/communities/header-image', formData, this.authFileHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.updateHeaderImage`);
                throw new PliziAPIError(`$communities.updateHeaderImage`, error.response);
            });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return null;
    }

    /**
     * загружает список тем
     * @returns {Promise<null|any>}
     */
    async getThemes() {
        let response = await this.axios.get('/api/communities/themes/list', this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.getThemes`);
                throw new PliziAPIError(`$communities.getThemes`, error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }
}

export default PliziCommunitiesAPI;
