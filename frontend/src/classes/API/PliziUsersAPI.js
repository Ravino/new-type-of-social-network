import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziUsersAPI extends PliziBaseAPI{

    /**
     * получение детальной информации о юзере
     * @param {number|null} userId - если ID НЕ указан, то о текущем юзере
     * @returns {Object|null} - объект с данными юзера
     */
    async getUser(userId) {
        const path = (userId) ? `api/user/${userId}` : 'api/user';

        let response = await this.axios.get(path, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, '$users.getUser');
                throw new PliziAPIError('$users.getUser', error.response);
            });

        if (200 === response.status) {
            return response.data;
        }

        return null;
    }


    /**
     * @deprecated
     * получение детальной информации о юзере
     * @param {number} id - числовой ID юзера
     * @returns {Object|null} - объект с данными юзера
     */
    async infoUser(id) {
        let response = await this.__axios.get('' + id, this.__getAuthHeaders())
            .catch((error) => {
                this.__checkIsTokenExperis(error, `infoUser`);
                throw new PliziAPIError(`infoUser`, error.response);
            });

        if (200 === response.status) {
            return response.data.data;
        }

        return null;
    }

}

export { PliziUsersAPI as default}
