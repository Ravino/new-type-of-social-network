import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziImageAPI extends PliziBaseAPI {
    /**
     * Лайкаем изображение из поста.
     *
     * @param {number} postId
     * @param {number} imageId
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async likePostImage(postId, imageId){
        let response = await this.axios.post(`api/posts/${postId}/image/like`, { imageId }, this.authHeaders)
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `$image.likePostImage` );
                throw new PliziAPIError( `$image.likePostImage`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data;
        }

        return null;
    }
}

export default PliziImageAPI;
