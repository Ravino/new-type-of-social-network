import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from './PliziAPIError.js';

class PliziPostAPI extends PliziBaseAPI {
    /**
     * Получение пользовательских постов.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getPosts(limit, offset){
        let path = 'api/user/posts/';
        let qParams = '';

        if (limit && offset) {
            qParams = `?limit=${limit}&offset=${offset}`;
        }

        let response = await this.axios.get( path + qParams, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `getPosts` );
                throw new PliziAPIError( `getPosts`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Получение новостей.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getNews(limit, offset){
        let path = 'api/user/news';
        let qParams = '';

        if (limit && offset) {
            qParams = `?limit=${limit}&offset=${offset}`;
        }

        let response = await this.axios.get( path + qParams, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `getNews` );
                throw new PliziAPIError( `getNews`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Получение постов на страницах других пользователей.
     * @public
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async getPostsByUserId( id, limit, offset ){
        let path = `api/user/${id}/posts/`;
        let qParams = '';

        if (limit && offset) {
            qParams = `?limit=${limit}&offset=${offset}`;
        }

        let response = await this.axios.get( path + qParams, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `getPostsByUserId` );
                throw new PliziAPIError( `getPostsByUserId`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Создание постов.
     * @param formData
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async storePost( formData ){
        let response = await this.axios.post( 'api/posts', formData, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `storePost` );
                throw new PliziAPIError( `storePost`, error.response );
            } );

        if ( response.status === 201 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Создание постов в сообществе.
     * @param communityId
     * @param formData
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async storePostByCommunity(communityId, formData) {
        let response = await this.axios.post( `api/communities/${communityId}/posts`, formData, this.authHeaders )
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `storePostByCommunity` );
              throw new PliziAPIError( `storePostByCommunity`, error.response );
          } );

        if ( response.status === 201 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Загружка файлов для постов.
     * @param picsArr
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async storePostAttachments( picsArr ){
        const formData = new FormData();

        for ( let i = 0; i < picsArr.length; i++ ){
            formData.append( 'files[]', picsArr[i] );
        }

        let response = await this.axios.post( 'api/posts/attachments', formData, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `storePostAttachments` );
                throw new PliziAPIError( `storePostAttachments`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Удаление постов со стены аутентифицированого пользователя.
     * @param id
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async deletePost( id ){
        let response = await this.axios.delete( `api/posts/${id}`, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `deletePost` );
                throw new PliziAPIError( `deletePost`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data;
        }

        return null;
    }

    /**
     * Восстановление поста.
     *
     * @param id
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async restorePost( id ){
        let response = await this.axios.get( `api/posts/${id}/restore`, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `restorePost` );
                throw new PliziAPIError( `restorePost`, error.response );
            } );

        if ( response.status === 200 ){
            return response.data;
        }

        return null;
    }

    /**
     * Редактирование поста.
     *
     * @param id
     * @param formData
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async updatePost( id, formData ){
        let response = await this.axios.post( `api/posts/${id}/update`, formData, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `editPost` );
                throw new PliziAPIError( `editPost`, error.response );
            } );


        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Репост чужой записи на свойю стену.
     *
     * @param id
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async sharePostToWall( id ){
        let response = await this.axios.post( `api/posts/share/wall`, { id }, this.authHeaders )
            .catch( ( error ) => {
                this.checkIsTokenExpires( error, `sharePostToWall` );
                throw new PliziAPIError( `sharePostToWall`, error.response );
            } );


        if ( response.status === 201 ){
            return response.data;
        }

        return null;
    }

    /**
     * Удаление атачментов из поста.
     *
     * @param id
     * @returns {null}
     * @throws PliziAPIError
     */
    async deletePostImage(postId, attachmentId) {
        let response = await this.axios.delete( `api/posts/${postId}/attachment/${attachmentId}`, this.authHeaders )
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `deletePostImage` );
              throw new PliziAPIError( `deletePostImage`, error.response );
          } );


        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Лайк постов.
     *
     * @param postId
     * @returns {object[]|null}
     * @throws PliziAPIError
     */
    async likePost(postId) {
        let response = await this.axios.post( `api/posts/rate`, { postId },this.authHeaders )
          .catch( ( error ) => {
              this.checkIsTokenExpires( error, `likePost` );
              throw new PliziAPIError( `likePost`, error.response );
          } );


        if ( response.status === 200 ){
            return response.data.data;
        }

        return null;
    }

    /**
     * Получение пользователей которые лайкнули пост.
     *
     * @param {number} postId
     * @param {number} limit
     * @param {number} offset
     * @return {object[]|null}
     * @throws PliziAPIError
     */
    async getUsersLikes(postId, limit, offset) {
        let path = `api/posts/${postId}/likes/users`;
        let qParams = '';

        if (limit && offset) {
            qParams = `?limit=${limit}&offset=${offset}`;
        }

        let response = await this.axios.get(path + qParams, this.authHeaders)
            .catch((error) => {
                this.checkIsTokenExpires(error, `getUsersLikes`);
                throw new PliziAPIError(`getUsersLikes`, error.response);
            });


        if (response.status === 200) {
            return response.data.data.list;
        }

        return null;
    }

    /**
     * Оставить комментарий
     *
     * @param {string} body
     * @param {number} postId
     * @param {number} replyOn
     * @return {object[]|null}
     * @throws PliziAPIError
     */
     async setPostComments(body, postId, replyOn = 0) {
         const response = await this.axios.post(`api/comment/post`, {
             body,
             postId,
             replyOn
        }, this.authHeaders
     );

      if (response.status === 200) {
          return response.data
      }

      return null;
    }

    async getCommentsById(postId) {
        const response = await this.axios.get(`api/comment/post/${postId}`, this.authHeaders);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    };

    async deleteCommentById(commentId) {
        const response = await this.axios.delete(`api/comment/${commentId}`, this.authHeaders);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    };
}

export default PliziPostAPI;
