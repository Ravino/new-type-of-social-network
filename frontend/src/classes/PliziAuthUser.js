import PliziUzer from './PliziUser.js';
import PliziUser from "./PliziUser";

class PliziAuthUser extends PliziUzer{
    /**
     * ключ в localStorage куда сохраняем данные юзера
     * @type {string}
     * @private
     */
    __localStorageKey = `pliziUser`;

    /**
     *
     * @type {boolean}
     * @private
     */
    __isDataReady = false;

    /**
     *
     * @type {number}
     * @private
     */
    _id = -1;

    /**
     *
     * @type {string}
     * @private
     */
    _token = ``;

    /**
     *
     * @type {string}
     * @private
     */
    _channel = ``;

    /**
     *
     * @type {string}
     * @private
     */
    _email = ``;

    /**
     * массивс полученными инвайтами
     * @type {PliziUzer[]}
     * @private
     */
    _invitations = [];


    /**
     * загружаем тут данные которые пришли от метода api/user
     * @param {Object} inputData
     * @param {string} token
     */
    saveUserData(inputData, token){
        super.saveUserData(inputData);

        this._email = (inputData.data.email+``).trim();
        this._channel = (inputData.channel) ? (inputData.channel+``).trim() : ``;

        if (token) {
            this._token = (token+'').trim();
        }

        this.storeData();
    }


    /**
     * сохраняет в localStorage (по ключу localStorageKey) данные юзера в строком виде
     * @returns {string} - данные юзера в строком виде
     */
    storeData() {
        const sData = this.toString();
        window.localStorage.setItem( this.localStorageKey, sData );

        return sData;
    }


    /**
     * пытается восстановить данные юзера из localStorage
     * @returns {object|null} - данные юзера в виде объекта, если данные из localStorage
     */
    restoreData() {
        const sData = window.localStorage.getItem(this.localStorageKey);

        if (typeof sData === 'undefined'  ||  sData===null  ||  sData===``) return null;

        let oData = null;

        try {
            oData = JSON.parse(sData);

            if (oData  &&  oData.data &&  oData.data.email  &&  oData.data.profile  &&  oData.data.profile.firstName   &&  oData.data.profile.lastName) {
                this.saveUserData(oData, ``);
            } else {
                return null;
            }

        } catch (e){
            if ( window.console !== undefined && window.console.error ) window.console.warn( e.toString() );

            return null;
        }

        return this.toJSON();
    }


    /**
     * очищает данные
     */
    cleanData(){
        super.cleanData();
        this._email = ``;
        this._channel = ``;

        window.localStorage.removeItem( this.localStorageKey );
    }


    /**
     * ключ в localStorage куда сохраняем данные юзера
     * @returns {string}
     */
    get localStorageKey(){
        return this.__localStorageKey;
    }

    /**
     *
     * @returns {string}
     */
    get token(){
        return this._token;
    }

    /**
     * @param {string} jToken
     */
    set token(jToken){
       this._token = (jToken+'').trim();
    }

    /**
     *
     * @returns {string}
     */
    get channel(){
        return this._channel;
    }

    /**
     *
     * @returns {string}
     */
    get email(){
        return this._email;
    }

    /**
     * @returns {PliziUzer[]}
     */
    get invitations(){
        return this._invitations;
    }

    /**
     * кол-во полученные инвайтов
     * @returns {number}
     */
    get invitationsNumber(){
        return (this._invitations) ? this._invitations.length : 0;
    }


    invitationsClean(){
        this._invitations = [];
    }

    /**
     * должен получать респонс от сервера, сам преобразует в коллекцию PliziUser
     * @param {object[]} invs
     */
    invitationsLoad(invs){
        window.console.log(`UserAuth::invitationsLoad`);
        this.invitationsClean();

        invs.map( (invItem) => {
            this._invitations.push( new PliziUser({ data : invItem} ) );
        });
    }


    /**
     * объект который надо удалить
     * @param {PliziUzer|{id:number}} invit
     */
    invitationRemove(invit){
        this._invitations = this._invitations.filter((invItem) => {
            return invItem.id !== invit.id;
        });
    }


    /**
     * Обновление данных в классе.
     * @param data
     */
    updateData(data) {
        for(let prop in data) {
            if (prop === 'birthday') {
                this['_' + prop] = new Date(data[prop]);
            } else {
                this['_' + prop] = data[prop];
            }
        }

        this.storeData();
    }

    /**
     * @deprecated
     * Обновление токена
     * @param newToken
     */
    updateToken(newToken) {
        // FIXME: зачем тут вызов storeData ?
        // токен в localStorage это не сохранит
        // этот метод должен решать одну задачу - сохранение токена в localStorage
        // для того, чтобы просто сохранить в класс лучше использовать сеттер (который уже есть выше)
        // и в нём заодно и сохранять в localStorage
        this.__token = newToken;
        this.storeData();
    }

    toJSON() {
        let res = super.toJSON();
        res.channel = this._channel;
        res.email = this._email;

        return res;
    }
}

export { PliziAuthUser as default}
