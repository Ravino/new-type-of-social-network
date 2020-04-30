import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziFriendAPI extends PliziBaseAPI {

    /**
     * Получение возможных друзей.
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getPossibleFriends(){
        let response = await this.axios.get( 'api/user/friendship/possible', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `getPossibleFriends` );
                throw new PliziAPIError( `getPossibleFriends`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Получение рекомендуемых друзей.
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getRecommendedFriends(){
        let response = await this.axios.get( 'api/user/friendship/recommended', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `getRecommendedFriends` );
                throw new PliziAPIError( `getRecommendedFriends`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }
}

export default PliziFriendAPI;
