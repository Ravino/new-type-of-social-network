import PliziFriend from '../PliziFriend.js';
import PliziStoredCollection from './PliziStoredCollection.js';

/**
 * класс для работы со списком Избранных
 */
class PliziFavoritesCollection extends PliziStoredCollection {

    localStorageKey = `pliziFavorites`;

    restoreEventName = 'FavoritesIsRestored';
    loadEventName = 'FavoritesIsLoaded';
    updateEventName = 'FavoritesIsUpdated';

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


    onAddToFavorites(evData){
        window.console.warn(evData,`onAddToFavorites`);
        //this.add(evData);
        //this.storeData();
        //this.emit(this.updateEventName);
    }

    /**
     * проверяем есть юзер с userID ли в Избранных
     * @param {string} userID - проверяемый ID
     * @returns {boolean} - true если userID есть во Избранных
     */
    checkIsFavorite(userID){
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


    async load(){
        this.clear();

        let apiResponse = null;

        try {
            apiResponse = await this.api.$friend.Favorites();
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


    favoriteStateUpdated(invID, newData){
        window.console.log(`favoriteStateUpdated`);
        let favorite = this.get(invID);

        if (favorite) {
            this.storeData();
        }
    }

}

export { PliziFavoritesCollection as default }
