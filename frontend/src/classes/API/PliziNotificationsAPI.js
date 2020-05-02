import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziNotificationsAPI extends PliziBaseAPI {

    /**
     * получаем список нотификаций
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async list() {
        let response = await this.axios.get('api/user/notifications', this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, '$notifications.notificationsList');
                throw new PliziAPIError('$notifications.notificationsList', error.response);
            });

        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }

}

export default PliziNotificationsAPI;
