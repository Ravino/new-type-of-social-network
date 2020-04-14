import PliziUzer from './PliziUser.js';

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

    toJSON() {
        let res = super.toJSON();
        res.channel = this._channel;
        res.email = this._email;

        return res;
    }

    updateData(fieldName, newValue) {
        switch(fieldName){
            case `firstName`:
                this.firstName = (newValue+'').trim();
                window.console.log( this.firstName, 'firstName new');
                break;

            case `lastName`:
                this.lastName = (newValue+'').trim();
                window.console.log( this.lastName, 'lastName new');
                break;

            default:
                window.console.warn(`PliziUser::updateData: unknown field ${fieldName}!`);
        }
    }

}

export { PliziAuthUser as default}
