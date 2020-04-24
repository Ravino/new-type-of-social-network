import PliziRecipient from './PliziRecipient.js';

/**
 * класс для работы со списком пересылаемых сообщений
 */
class PliziRecipientsCollection {

    /**
     * @type {Map}
     * @private
     */
    _collection = null;


    constructor(){
        this._collection = new Map();
    }


    size(){
        return this._collection.size;
    }


    length(){
        return this._collection.size;
    }


    clean(){
        this._collection.clear();
    }


    /**
     * метод сравнения для сортировки
     * @param {PliziRecipient} d1
     * @param {PliziRecipient} d2
     * @returns {number}
     * @private
     */
    __compare(d1, d2){
        return d1.fullName > d2.firstName ? 1 : -1;
    }


    /**
     * @param {object} data
     * @param {number|null} chatId
     */
    add(data, chatId){
        const newRecip = new PliziRecipient(data, chatId)

        this._collection.set(data.id, newRecip);
    }


    /**
     * поиск в коллекции по ID
     * @param {number} ID - ID нужной сущности
     * @returns {PliziRecipient} - нужная сущность, или UNDEFINED если не нашли
     */
    getByID(ID){
        return this._collection.get(ID);
    }


    deleteByID(ID){
        return this._collection.delete(ID);
    }


    /**
     * @returns {PliziRecipient[]}
     */
    asArray(){
        let arr = [];

        this._collection.forEach((value) => {
            arr.push( value );
        });

        arr.sort( this.__compare );

        return arr;
    }

}

export { PliziRecipientsCollection as default }
