import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziPhotoalbumsAPI extends PliziBaseAPI {
    /**
     * Получение фотоальбомов пользователя.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    // async getUserVideo() {
    //     let response = await this.axios.get('api/user/videos', this.authHeaders)
    //       .catch( ( error ) => {
    //           this.checkIsTokenExpires( error, `getUserVideo` );
    //           throw new PliziAPIError( `getUserVideo`, error.response );
    //       } );
    //
    //     if ( response.status === 200 ){
    //         return response.data.data.list;
    //     }
    //
    //     return null;
    // }

    /**
     * Cоздание нового фотоальбома.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async createPhotoalbum(formData) {
        let response = await this.axios.post('api/photo_albums', formData, this.authHeaders)
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `createPhotoalbum` );
              throw new PliziAPIError( `createPhotoalbum`, error.response );
          } );

        if ( response.status === 200 ){
            console.log(response);
            return response.data.data;
        }

        return null;
    }

    /**
     * Обновление данных альбома
     * @param {string} id
     * @param {title} title - данные для загрузки
     * @param {description} description - данные для загрузки
     * @returns {object|null} - ответ сервера
     * @throws PliziAPIError
     */
    async updatePhotoalbum( id, title, description ){
        let requestBody = {
            "communityId": id,
            "title": title,
            "description": description
        }
        let response = await this.axios.post( `api/photo_albums/{id}`, requestBody, this.authHeaders )
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
