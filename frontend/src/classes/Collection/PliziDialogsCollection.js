import PliziDialog from '../PliziDialog.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком диалогов в чате
 */
class PliziDialogsCollection extends PliziCollection {

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
        this.emit(this.updateEventName);
    }


    new(data){
        return new PliziDialog(data);
    }


    /**
     * поиск диалога по его ID
     * @param {string} ID - ID нужной сущности
     * @returns {PliziDialog} - нужная сущность, или UNDEFINED если не нашли
     */
    get(ID){
        return this.collection.get(ID);
    }


    get firstDialog(){
        window.console.log(this.collection.size, `firstDialog`);
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
        let apiResponse = null;

        try {
            apiResponse = await this.api.$chat.dialogs();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.clean();
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
