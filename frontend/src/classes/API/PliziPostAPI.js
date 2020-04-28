import PliziBaseAPI from './PliziBaseAPI.js'
import PliziAPIError from "./PliziAPIError";

class PliziPostAPI extends PliziBaseAPI {
  /**
   * Получение пользовательских постов.
   * @public
   * @returns {object[]|null}
   * @throws PliziAPIError
   */
  async getPosts() {
    let response = await this.axios.get('api/user/posts', this.authHeaders)
      .catch((error) => {
        this.checkIsTokenExperis(error, `getPosts`);
        throw new PliziAPIError(`getPosts`, error.response);
      });

    if (response.status === 200) {
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
  async storePost(formData) {
    let response = await this.axios.post('api/posts', formData, this.authHeaders)
      .catch((error) => {
        this.checkIsTokenExperis(error, `storePost`);
        throw new PliziAPIError(`storePost`, error.response);
      });

    if (response.status === 201) {
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
  async storePostAttachments(picsArr) {
    const formData = new FormData();

    for (let i = 0; i < picsArr.length; i++) {
      formData.append('files[]', picsArr[i]);
    }

    let response = await this.axios.post('api/posts/attachments', formData, this.authHeaders)
      .catch((error) => {
        this.checkIsTokenExperis(error, `storePostAttachments`);
        throw new PliziAPIError(`storePostAttachments`, error.response);
      });

    if (response.status === 200) {
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
  async deletePost(id) {
    let response = await this.axios.delete(`api/posts/${id}`, this.authHeaders)
      .catch((error) => {
        this.checkIsTokenExperis(error, `deletePost`);
        throw new PliziAPIError(`deletePost`, error.response);
      });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  }

  async restorePost(id) {
    let response = await this.axios.get(`api/posts/${id}/restore`, this.authHeaders)
      .catch((error) => {
        this.checkIsTokenExperis(error, `restorePost`);
        throw new PliziAPIError(`restorePost`, error.response);
      });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  }
}

export default PliziPostAPI;
