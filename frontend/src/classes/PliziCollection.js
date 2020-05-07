import PliziFriend from "./PliziFriend";

/**
 * класс упрощения работы с коллекциями
 */
class PliziCollection {

    /**
     * флаг, что данные были загружены из источника (серверное API)
     * @type {boolean}
     * @private
     */
    _isLoad = false;

    /**
     * @type {Map}
     * @private
     */
    _collection = null;

    constructor(inputData, objClass){
        this._collection = new Map();

        if(inputData  &&  objClass) {
            this.receive(inputData, objClass);
        }
    }

    get keys(){
        return this._collection.keys();
    }

    get list(){
        return this._collection;
    }

    get collection(){
        return this._collection;
    }

    get isLoad(){
        return this._isLoad;
    }

    set isLoad( value ){
        this._isLoad = value;
    }

    get size(){
        return this._collection.size;
    }

    get length(){
        return this._collection.size;
    }

    clean(){
        window.console.warn(`Deprecated! clean`);
        this._collection.clear();
    }

    clear(){
        this._collection.clear();
    }

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
     * @param {object} data
     */
    add(data){
        const conv = this.new(data);

        this._collection.set(conv.id, conv);
    }

    receive(inputArray, objClass){
        if (inputArray){
            inputArray.map( ( oItem ) => {
                this.add( new objClass( oItem ) );
            } );
        }
    }

    new(data){
        return data;
    }

    /**
     * @param {object} data
     */
    update(data){
        this.add(data);
    }

    /**
     * поиск в коллекции по ID
     * @param {number} ID - ID нужной сущности
     * @returns {Object} - нужная сущность, или UNDEFINED если не нашли
     */
    get(ID){
        return this._collection.get(ID);
    }


    delete(ID){
        this._collection.delete(ID);
    }


    /**
     * @param {Function} checkFunction
     * @returns {Object[]}
     */
    filter(checkFunction){
        let arr = [];

        this._collection.forEach((value) => {
            if (checkFunction(value)) {
                arr.push( value );
            }
        });

        return arr;
    }


    /**
     * @param {Function|null} compareFunction
     * @returns {Object[]}
     */
    asArray(compareFunction){
        let arr = [];

        this._collection.forEach((value) => {
            arr.push( value );
        });

        if (compareFunction){
            arr.sort( compareFunction );
        }
        else {
            arr.sort( this.compare );
        }

        return arr;
    }

    toString(){
        return JSON.stringify( this.toJSON() );
    }

    toJSON() {
        if (this.collection.size === 0)
            return [];

        let ret = [];

        this.collection.forEach((aItem)=>{
            ret.push( aItem.toJSON() );
        });

        return ret;
    }

}

export { PliziCollection as default }