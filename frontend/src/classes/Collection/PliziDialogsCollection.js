import PliziDialog from '../PliziDialog.js';
import PliziStoredCollection from './PliziStoredCollection.js';

/**
 * класс для работы со списком диалогов в чате
 */
class PliziDialogsCollection extends PliziStoredCollection {

    localStorageKey = `pliziDialogs`;

    restoreEventName= 'DialogsIsRestored';
    loadEventName   = 'DialogsIsLoaded';
    updateEventName = 'DialogsIsUpdated';

    constructor(apiObj){
        super(apiObj);
    }

    /**
     * метод сравнения для сортировки, диалоги сортируем по дате
     * @param {PliziDialog} d1
     * @param {PliziDialog} d2
     * @returns {number}
     */
    compare(d1, d2){
        if (d1.lastMessageUnix === d2.lastMessageUnix)
            return 0;

        return d1.lastMessageUnix > d2.lastMessageUnix ? -1 : 1;
    }


    onAddNewDialog(evData){
        window.console.log(evData, `onAddNewDialog`);
        this.add(evData);
        this.storeData();
        this.restore();
        this.emit(this.updateEventName);
    }

    onRemoveDialog(removedDialogId){
        window.console.warn(removedDialogId,`onRemoveDialog`);
        this.delete(removedDialogId.id);
        this.storeData();
        this.restore();
        this.emit(this.updateEventName);
    }


    new(data){
        return new PliziDialog(data);
    }


    /**
     * поиск диалога по его ID
     * @param {string} ID - ID диалога
     * @returns {PliziDialog} - диалог, или UNDEFINED если не нашли
     */
    get(ID){
        return this.collection.get(ID);
    }


    /**
     * поиск приватного чата по ID собеседника
     * @param {string} userID - ID собеседника
     * @returns {PliziDialog} - нужная сущность, или UNDEFINED если не нашли
     */
    getDialogByCompanion(userID){
        let found = null;

        this.collection.forEach((dItem) => {
            if (dItem.isPrivate  &&  dItem.companion.id===userID){
                found = dItem.id;
            }
        });

        return (found) ? this.collection.get(found) : undefined;
    }


    get firstDialog(){
        if (this.collection.size === 0)
            return null;

        return this.asArray()[0];
    }


    shortList(){
        let arr = [];

        this.collection.forEach((item) => {
            arr.push( item.id + ` `+item.companion.firstName );
        });

        return arr;
    }


    /**
     * @returns {PliziDialog[]}
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
        let apiResponse = null;

        try {
            apiResponse = await this.api.$chat.dialogs();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.clear();
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


    dialogStateUpdated(dialogID, newData){
        let dlg = this.get(dialogID);

        if (dlg) {
            dlg.lastMessageDT = newData.lastMessageDT;
            dlg.lastMessageText = newData.lastMessageText;
            dlg.isLastFromMe = newData.isLastFromMe;
            dlg.isRead = newData.isRead;

            this.collection.set(dialogID, dlg);

            this.storeData();
        }
    }

}

export { PliziDialogsCollection as default }
