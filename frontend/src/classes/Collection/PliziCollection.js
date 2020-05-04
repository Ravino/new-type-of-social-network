import PliziAPI from '../PliziAPI.js';

/**
 * класс упрощения работы с коллекциями
 */
class PliziCollection {

    /**
     * ключ в localStorage куда сохраняем данные
     * @type {string}
     */
    localStorageKey = ``;

    /**
     * флаг, что данные были загружены из источника (серверное API)
     * @type {boolean}
     * @private
     */
    _isLoad = false;

    /**
     * ссылка на API
     * @type {PliziAPI}
     * @private
     */
    _api = null;

    /**
     * @type {Map}
     * @private
     */
    _collection = null;

    /**
     * имя эвента, который мы кидаем когда данные в коллекцию загружены с сервера
     * @type {string}
     * @public
     */
    loadEventName = '';

    /**
     * имя эвента, который мы кидаем когда данные в коллекцию загружены с localStorage
     * @type {string}
     * @public
     */
    restoreEventName = '';

    /**
     * имя эвента, который мы кидаем когда из коллекции сохранены в localStorage
     * @type {string}
     * @public
     */
    storeEventName = '';

    /**
     * имя эвента, который мы кидаем когда данные в коллекции обновлены
     * @type {string}
     * @public
     */
    updateEventName = '';


    /**
     * @param {PliziAPI} apiObj
     */
    constructor(apiObj){
        this._api = apiObj;
        this._collection = new Map();
    }

    /**
     * @returns {PliziAPI}
     */
    get api(){
        return this._api;
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

    /**
     * должен получать респонс от сервера, сам преобразует в коллекцию нужного вида
     * @param {object[]} entities
     */
    load(entities){
        this._isLoad = true;
    }

    /**
     * сохраняет в localStorage данные коллекции
     * @returns {string} - данные коллекции в строком виде
     */
    storeData() {
        const sData = this.toString();
        window.localStorage.setItem( this.localStorageKey, sData );
        if (this.storeEventName) {
            this.emit(this.storeEventName);
        }

        return sData;
    }

    /**
     * пытается восстановить данные коллекции из localStorage
     * @returns {object|null} - данные коллекции в виде объекта, если данные из localStorage
     */
    restoreData() {
        const sData = localStorage.getItem(this.localStorageKey);

        if (typeof sData === 'undefined'  ||  sData===null  ||  sData===``)
            return null;

        let oData = null;

        try {
            oData = JSON.parse(sData);

            if (oData) {
                oData.map((oItem)=>{ this.add( oItem ); });
                if (this.restoreEventName) {
                    this.emit(this.restoreEventName);
                }
            }
        }
        catch (e){
            if ( window.console !== undefined && window.console.error ) window.console.warn( e.toString() );

            return null;
        }

        return this.toJSON();
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

    emit(eventName, eventData){
        if (eventName) {
            this.api.emit(eventName, eventData);
        }
    }

}

export { PliziCollection as default }
