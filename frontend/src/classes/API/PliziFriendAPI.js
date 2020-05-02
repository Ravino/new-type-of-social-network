import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziFriendAPI extends PliziBaseAPI {

    /**
     * получаем список френдов, свой или другого юзера
     * @param {number|null} userID - ID юзера чей список друзей хотим получить
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async friendsList(userID){
        let path = 'api/user/friendship';

        if (path && (userID >>> 0) !== 0) {
            path = `api/user/${userID}/friendship`;
        }

        let response = await this.axios.get(path, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, '$friend.friendsList');
                throw new PliziAPIError('$friend.friendsList', error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }


    /**
     * Получение списка возможных друзей.
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getPossibleFriends(){
        let response = await this.axios.get( 'api/user/friendship/possible', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, '$friend.getPossibleFriends' );
                throw new PliziAPIError( `$friend.getPossibleFriends`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }


    /**
     * Получение списка рекомендуемых друзей
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getRecommendedFriends(){
        let response = await this.axios.get( 'api/user/friendship/recommended', this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, '$friend.getRecommendedFriends' );
                throw new PliziAPIError( '$friend.getRecommendedFriends', error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }


    /**
     * удаляет френда из друзей
     * @param {number} userID - ID френда
     * @returns {object|null}
     * @throws PliziAPIError
     */
    async friendshipStop(userID) {
        let response = await this.axios.delete('/api/user/friendship/'+userID, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, '$friends.friendshipStop');
                throw new PliziAPIError('$friends.friendshipStop', error.response);
            });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }

}

export default PliziFriendAPI;
