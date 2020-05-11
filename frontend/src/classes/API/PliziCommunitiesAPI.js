import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziCommunitiesAPI extends PliziBaseAPI {

    /**
     * Получение списка сообществ
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async loadCommunities(){
        let response = await this.axios.get( 'api/communities', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.loadCommunities` );
                throw new PliziAPIError( `$communities.loadCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }


    async userCommunities(){
        let response = await this.axios.get( 'api/user/communities', this.authHeaders )
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
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async posts(communityID){
        let response = await this.axios.get( `api/communities/${communityID}/posts`, this.authHeaders )
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
     * загружает аватарку сообщества
     * @param {formData} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async updatePrimaryImage(formData) {
        let response = await this.__axios.post('/api/communities/attachments', formData, this.authFileHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `$communities.updatePrimaryImage`);
                throw new PliziAPIError(`$communities.updatePrimaryImage`, error.response);
            });

        if (response.status === 201) {
            return response.data;
        }

        return null;
    }

}

export default PliziCommunitiesAPI;
