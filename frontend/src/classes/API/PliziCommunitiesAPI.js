import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziCommunitiesAPI extends PliziBaseAPI {

    /**
     * Получение списка сообществ
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getCommunities(){
        let response = await this.axios.get( 'api/communities', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.getCommunities` );
                throw new PliziAPIError( `$communities.getCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }


    async myCommunities(){
        let response = await this.axios.get( 'api/user/communities', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.myCommunities` );
                throw new PliziAPIError( `$communities.myCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    async userCommunities(userID){
        let response = await this.axios.get( 'api/communities/'+userID, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$communities.userCommunities` );
                throw new PliziAPIError( `$communities.userCommunities`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
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
}

export default PliziCommunitiesAPI;
