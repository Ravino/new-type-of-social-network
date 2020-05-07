import PliziFriend from '../PliziFriend.js';
import PliziStoredCollection from './PliziStoredCollection.js';

/**
 * класс для работы со списком друзей
 */
class PliziFriendsCollection extends PliziStoredCollection {

    localStorageKey = `pliziFriends`;

    restoreEventName = 'FriendsIsRestored';
    loadEventName = 'FriendsIsLoaded';
    updateEventName = 'FriendsIsUpdated';

    /**
     * метод сравнения для сортировки
     * @param {PliziFriend} d1
     * @param {PliziFriend} d2
     * @returns {number}
     */
    compare(d1, d2){
        if (d1.fullName === d2.fullName)
            return 0;

        return d1.fullName > d2.fullName ? -1 : 1;
    }


    onAddAcceptFriendsShip(evData){
        window.console.warn(evData,`onAddAcceptFriendsShip`);
        //this.add(evData);
        //this.storeData();
        //this.emit(this.updateEventName);
    }

    /**
     * возвращает список избранных друзей
     * TODO: переписать на реальный возврат
     * @returns {PliziFriend[]} - список избранных друзей
     */
    get favorites(){
        return this.asArray().slice(0, 10);
    }


    /**
     * проверяем есть юзер с userID ли во френдах
     * @param {number} userID - проверяемый ID
     * @returns {boolean} - true если userID есть во френдах
     */
    checkIsFriend(userID){
        const res = this.collection.get(userID);
        return !! res;
    }


    /**
     * @param a
     * @returns {*}
     * @private
     */
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


    new(data){
        return new PliziFriend(data);
    }


    /**
     * поиск друга по ID
     * @param {string} ID - ID нужной сущности
     * @returns {PliziFriend} - нужная сущность, или UNDEFINED если не нашли
     */
    get(ID){
        return this.collection.get(ID);
    }


    /**
     * @returns {PliziFriend[]}
     */
    asArray(){
        let arr = [];

        this.collection.forEach((notifItem) => {
            arr.push( notifItem );
        });

        arr.sort( this.compare );

        return arr;
    }


    async load(){
        this.clear();

        this.restoreData();

        if (this.size > 0) {
            this.isLoad = true;
            this.emit(this.restoreEventName);
            return true;
        }

        let apiResponse = null;

        try {
            apiResponse = await this.api.$friend.friendsList();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            apiResponse.map( (notifItem) => {
                this.add( notifItem );
            });

            this.storeData();

            this.isLoad = true;

            if (this.loadEventName) {
                this.emit(this.loadEventName);
            }
        }

        return true;
    }

    friendStateUpdated(invID, newData){
        window.console.log(`friendStateUpdated`);
        let invitation = this.get(invID);

        if (invitation) {
            //invitation.lastMessageDT = newData.lastMessageDT;
            //invitation.lastMessageText = newData.lastMessageText;
            //invitation.isLastFromMe = newData.isLastFromMe;
            //invitation.isRead = newData.isRead;

            //this.collection.set(invID, invitation);

            this.storeData();
        }
    }

}

export { PliziFriendsCollection as default }
