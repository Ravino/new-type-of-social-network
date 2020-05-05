import PliziRecipient from '../PliziRecipient.js';
import PliziCollection from './PliziCollection.js';

/**
 * класс для работы со списком получателей пересылаемых сообщений
 */
class PliziRecipientsCollection extends PliziCollection{

    /**
     * метод сравнения для сортировки
     * @param {PliziRecipient} d1
     * @param {PliziRecipient} d2
     * @returns {number}
     */
    compare(d1, d2){
        return d1.fullName > d2.firstName ? 1 : -1;
    }


    /**
     * @param {Object} data
     * @param {number|null} chatId
     */
    add(data, chatId){
        const newRecip = new PliziRecipient(data, chatId);

        this.collection.set(newRecip.id, newRecip);
    }


    /**
     * поиск в коллекции по ID
     * @param {number} ID - ID нужной сущности
     * @returns {PliziRecipient} - нужная сущность, или UNDEFINED если не нашли
     */
    getByID(ID){
        return this.collection.get(ID);
    }


    /**
     * @returns {PliziRecipient[]}
     */
    asArray(){
        let arr = [];

        this.collection.forEach((value) => {
            arr.push( value );
        });

        arr.sort( this.compare );

        return arr;
    }

}

export { PliziRecipientsCollection as default }
