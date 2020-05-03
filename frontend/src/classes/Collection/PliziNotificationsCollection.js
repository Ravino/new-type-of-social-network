import PliziNotification from '../PliziNotification.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком нотификаций
 */
class PliziNotificationsCollection extends PliziCollection {

    localStorageKey = `pliziNotifications`;

    restoreEventName = 'NotificationsIsRestored';
    loadEventName = 'NotificationsIsLoaded';
    updateEventName = 'NotificationsIsUpdated';

    constructor(apiObj){
        super(apiObj);
        window.console.log(`PliziNotificationsCollection constructor`);
    }

    /**
     * метод сравнения для сортировки
     * @param {PliziNotification} d1
     * @param {PliziNotification} d2
     * @returns {number}
     */
    compare(d1, d2){
        if (d1.createdAt.valueOf() === d2.createdAt.valueOf())
            return 0;

        return d1.createdAt.valueOf() > d2.createdAt.valueOf() ? -1 : 1;
    }


    onAddNewNotification(evData){
        this.add(evData);
        this.storeData();
        this.emit(this.updateEventName);
    }


    new(data){
        return new PliziNotification(data);
    }


    /**
     * поиск приглашения по ID
     * @param {number} ID - ID нужной сущности
     * @returns {PliziInvitation} - нужная сущность, или UNDEFINED если не нашли
     */
    get(ID){
        return this.collection.get(ID);
    }


    /**
     * @returns {PliziNotification[]}
     */
    asArray(){
        let arr = [];

        this.collection.forEach((notifItem) => {
            arr.push( notifItem );
        });

        arr.sort( this.compare );

        return arr;
    }


    get idsList(){
        let arr = [];

        this.collection.forEach((notifItem) => {
            arr.push( notifItem.id );
        });

        return arr;
    }


    async load(){
        window.console.log(`PliziNotificationsCollection::load`);
        this.clean();

        this.restoreData(); // заремлено временно

        if (this.collection.size > 0) {
            this.isLoad = true;
            this.emit(this.restoreEventName);
            return true;
        }

        window.console.log(`PliziNotificationsCollection::load 22`);

        let apiResponse = null;

        try {
            apiResponse = await this.api.$notifications.list();
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

    notificationStateUpdated(invID, newData){
        window.console.log(`notificationStateUpdated`);
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

export { PliziNotificationsCollection as default }
