import PliziFriend from '../PliziFriend.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком Избранных
 * Chosens, а не Favorites чтобы буква F с френдами не путалась
 */
class PliziChosensCollection extends PliziCollection {

    localStorageKey = `pliziChosens`;

    restoreEventName = 'ChosensIsRestored';
    loadEventName = 'ChosensIsLoaded';
    updateEventName = 'ChosensIsUpdated';

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


    onAddChosensToFavorites(evData){
        window.console.warn(evData,`onAddFriendsToChosens`);
        //this.add(evData);
        //this.storeData();
        //this.emit(this.updateEventName);
    }

    /**
     * проверяем есть юзер с userID ли в Избранных
     * @param {number} userID - проверяемый ID
     * @returns {boolean} - true если userID есть во Избранных
     */
    checkIsChosens(userID){
        const res = this.collection.get(userID);
        return !! res;
    }


    new(data){
        return new PliziFriend(data);
    }


    /**
     * поиск друга по ID
     * @param {number} ID - ID нужной сущности
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

        return arr;
    }


    restore(){
        this.clean();

        this.restoreData();

        if (this.size > 0) {
            this.isLoad = true;
            if (this.restoreEventName) {
                this.emit(this.restoreEventName);
            }

            return true;
        }
    }


    async load(){
        this.clean();

        let apiResponse = null;

        try {
            apiResponse = await this.api.$friend.chosens();
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


    chosenStateUpdated(invID, newData){
        window.console.log(`chosenStateUpdated`);
        let favorite = this.get(invID);

        if (favorite) {
            this.storeData();
        }
    }

}

export { PliziChosensCollection as default }
