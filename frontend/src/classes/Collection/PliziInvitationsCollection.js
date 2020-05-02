import PliziInvitation from '../PliziInvitation.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком приглашений дружбы в чате
 */
class PliziInvitationsCollection extends PliziCollection {

    localStorageKey = `pliziInvitations`;

    restoreEventName = 'InvitationsIsRestored';
    loadEventName = 'InvitationsIsLoaded';
    updateEventName = 'InvitationsIsUpdated';

    constructor(apiObj){
        super(apiObj);
        window.console.log(`PliziInvitationsCollection constructor`);
    }

    /**
     * метод сравнения для сортировки, диалоги сортируем по дате
     * @param {PliziInvitation} d1
     * @param {PliziInvitation} d2
     * @returns {number}
     */
    compare(d1, d2){
        if (d1.fullName === d2.fullName)
            return 0;

        return d1.fullName > d2.fullName ? -1 : 1;
    }


    onAddNewInvitation(evData){
        this.add(evData);
        this.storeData();
        this.emit(this.updateEventName);
    }


    new(data){
        return new PliziInvitation(data);
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
     * @returns {PliziInvitation[]}
     */
    asArray(){
        let arr = [];

        this.collection.forEach((value) => {
            arr.push( value );
        });

        arr.sort( this.compare );

        return arr;
    }


    async load(){
        window.console.log(`PliziInvitationsCollection::load`);
        this.clean();

        //this.restoreData();

        if (this.collection.size > 0) {
            this.isLoad = true;
            this.emit(this.restoreEventName);
            return true;
        }

        let apiResponse = null;

        try {
            apiResponse = await this.api.$friend.invitationsList();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            apiResponse.map( (dialogItem) => {
                this.add( dialogItem );
            });

            this.storeData();

            this.isLoad = true;

            if (this.loadEventName) {
                this.emit(this.loadEventName);
            }
        }

        return true;
    }

    invitationStateUpdated(invID, newData){
        window.console.log(`invitationStateUpdated`);
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

export { PliziInvitationsCollection as default }
