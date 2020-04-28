import PliziDialog from '../PliziDialog.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком пересылаемых сообщений
 */
class PliziDialogsCollection extends PliziCollection {

    /**
     * имя эвента, который мы кидаем когда данные загружены с сервера
     * @type {string}
     * @public
     */
    eventName = 'DialogsIsLoaded';

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


    new(data){
        return new PliziDialog(data);
    }


    /**
     * поиск диалога по его ID
     * @param {number} ID - ID нужной сущности
     * @returns {PliziDialog} - нужная сущность, или UNDEFINED если не нашли
     */
    getByID(ID){
        return this.collection.get(ID);
    }


    get firstDialog(){
        if (this.collection.size === 0)
            return null;

        return this.asArray()[0];
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
        this.clean();

        this.restoreData();

        if (this.collection.size > 0) {
            this.emit();
            return true;
        }

        let apiResponse = null;

        try {
            apiResponse = await this.api.chatDialogs();
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
            this.emit();
        }

        return true;
    }

    dialogStateUpdated(dialogID, newData){
        //window.console.dir(newData, `newData`);
        //window.console.log(dialogID, `dialogID`);

        let dlg = this.getByID(dialogID);
        //window.console.log(dlg, `dlg`);

        dlg.isLastFromMe = newData.lastMessageDT;
        dlg.isLastFromMe = newData.lastMessageText;
        dlg.isLastFromMe = newData.isLastFromMe;
        dlg.isLastFromMe = newData.isRead;

        this.collection.set(dialogID, dlg);

        this.storeData();
    }

}

export { PliziDialogsCollection as default }
