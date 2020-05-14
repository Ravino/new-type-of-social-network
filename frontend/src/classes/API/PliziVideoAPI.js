import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziVideoAPI extends PliziBaseAPI {
    /**
     * Получение видео пользователя.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getUserVideo() {
        let response = await this.axios.get('api/user/videos', this.authHeaders)
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `getUserVideo` );
              throw new PliziAPIError( `getUserVideo`, error.response );
          } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Сохранение ссылок на видео.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async storeVideo(link, workMode, id) {
        let response = await this.axios.post('api/videos', {link, workMode, id}, this.authHeaders)
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `storeVideo` );
              throw new PliziAPIError( `storeVideo`, error.response );
          } );

        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }
}

export default PliziVideoAPI;
