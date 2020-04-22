import PliziFriend from './PliziFriend.js';
import PliziManager from './PliziManager.js';

class PliziFriendsManager extends PliziManager{

    /**
     * возвращает список избранных друзей
     * TODO: переписать на реальный возврат
     * @returns {PliziFriend[]} - список избранных друзей
     */
    get favorits(){
        return this.list.slice(0, 9);

        //return this.list.map((a) => [Math.random(),a])
        //    .sort((a,b) => a[0]-b[0])
        //    .map((a) => a[1]).slice(0, 9);
    }


    /**
     * возвращает список buddies
     * TODO: переписать на реальный возврат
     * @returns {PliziFriend[]} - список buddies
     */
    get buddies(){
        //return this.list.map((a) => [Math.random(),a])
        //    .sort((a,b) => a[0]-b[0])
        //    .map((a) => a[1]).slice(0, 9);
        return this.list.slice(0, 9);
    }


    /**
     * метод сравнения для сортировки
     * @param {PliziFriend} d1
     * @param {PliziFriend} d2
     * @returns {number}
     * @private
     */
    __compare(d1, d2){
        const t1 = d1.lastActivityUnixTime;
        const t2 = d2.lastActivityUnixTime;

        if (t1 > t2) return -1;
        if (t2 > t1) return 1;

        return 0;
    }


    /**
     * @param {number} friendID - ID друга, которого нужно обновить
     * @param {object} updatedData - объект с полями
     */
    update(friendID, updatedData){
        let frnd = this.getByID(friendID);

        if (frnd) {
            frnd.stateUpdate(updatedData);
        }
        else {
            window.console.warn(`PliziFriendsManager->update: друг с ID ${friendID} не найден!`);
        }
    }


    /**
     * загружает список друзей через API
     * по завершении загрузки кидает event friendsIsLoad
     * @emits friendsIsLoad
     */
    async load() {
        this.clean();

        let apiResponse = null;

        try {
            apiResponse = await this.api.friendsList();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            apiResponse.map( (friendItem) => {
                this.list.push( new PliziFriend(friendItem) );
            });

            this.isLoad = true;
            this.api.emit('friendsIsLoad', {});
        }

        return true;
    }

}

export { PliziFriendsManager as default}
