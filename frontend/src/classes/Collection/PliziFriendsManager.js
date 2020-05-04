import PliziFriend from '../PliziFriend.js';
import PliziManager from '../PliziManager.js';

/**
 * @deprecated
 * @TGA: 2020-05-03 устарел, но пока пусть побудет тут
 */
class PliziFriendsManager extends PliziManager{

    /**
     * коллекция сущностей
     * @type {PliziFriend[]}
     * @private
     */
    _collection = [];

    /**
     * возвращает список избранных друзей
     * TODO: переписать на реальный возврат
     * @returns {PliziFriend[]} - список избранных друзей
     */
    get favorites(){
        return this.list.slice(0, 9);
    }


    /**
     * возвращает список buddies
     * TODO: переписать на реальный возврат
     * @returns {PliziFriend[]} - список buddies
     */
    get buddies(){
        if (this.list) {
            return this.__shuffle(this.list).slice(0, 9);
        }

        return this.list;
    }


    __shuffle(a){
        if (a) {
            a = a.map( iA => iA);

            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
        }

        return a;
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
     * проверяем есть юзер с userID ли во френдах
     * @param {number} userID - проверяемый ID
     * @returns {boolean} - true если userID есть во френдах
     */
    checkIsFriend(userID){
        return !!this.list.find( (frItem) => {
            return (frItem.id === userID);
        });
    }


    /**
     * загружает список друзей через API
     * по завершении загрузки кидает event friendsIsLoad
     * @emits friendsIsLoad
     * @emits loadPossibleFriends
     * @emits loadRecommendedFriends
     */
    async load() {
        this.clean();

        let apiResponse = null;

        try {
            apiResponse = await this.api.$friend.friendsList();
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
