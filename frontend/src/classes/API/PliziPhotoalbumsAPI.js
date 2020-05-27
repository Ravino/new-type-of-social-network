import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziPhotoalbumsAPI extends PliziBaseAPI {
    /**
     * Получение фотоальбомов пользователя.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async list() {
        let response = await this.axios.get('api/photo-albums', this.authHeaders)
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `list` );
              throw new PliziAPIError( `list`, error.response );
          } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Cоздание нового фотоальбома.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async createPhotoalbum(formData) {
        let response = await this.axios.post('api/photo-albums', formData, this.authHeaders)
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `createPhotoalbum` );
              throw new PliziAPIError( `createPhotoalbum`, error.response );
          } );

        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Обновление данных альбома
     // * @param {string} albumId
     * @param {{description: string, title: string}} formData - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async updatePhotoalbum( albumId, formData ){
        let response = await this.axios.post( `api/photo-albums/${albumId}`, formData, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `updatePhotoalbum` );
                throw new PliziAPIError( `updatePhotoalbum`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }
}

export default PliziPhotoalbumsAPI;
