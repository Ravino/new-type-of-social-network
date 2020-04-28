import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziChatAPI extends PliziBaseAPI{

    /**
     * загружает список диалогов (чатов) у юзера
     * @public
     * @returns {object[]|null} - список диалогов юзера, или NULL если их нет
     */
    async dialogs() {
        let response = await this.__axios.get('api/chat/dialogs', this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `chatDialogs`);
                throw new PliziAPIError(`chatDialogs`, error.response);
            });

        if (response.status === 200) {
            return response.data.list;
        }

        return null;
    }

}

export { PliziChatAPI as default}
