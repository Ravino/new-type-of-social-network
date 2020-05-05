import PliziAPI from './PliziAPI.js';
import PliziAuthUser from './PliziAuthUser.js';

import PliziFriendsCollection from './Collection/PliziFriendsCollection.js';
import PliziDialogsCollection from './Collection/PliziDialogsCollection.js';
import PliziInvitationsCollection from './Collection/PliziInvitationsCollection.js';
import PliziNotificationsCollection from './Collection/PliziNotificationsCollection.js';

class PliziAuthClass {
    /**
     * ключ в localStorage куда сохраняем данные юзера
     * @type {string}
     * @private
     */
    __localStorageKey = `pliziUser`;

    /**
     * @type {string}
     * @private
     */
    _token = ``;

    /**
     * @type {string}
     * @private
     */
    _channel = ``;

    /**
     * @type {PliziAuthUser}
     * @private
     */
    _user = null;

    /**
     * ссылка на API
     * @type {PliziAPI}
     * @private
     */
    _api = null;

    /**
     * ссылка на менеджер френдов
     * @type {PliziFriendsCollection}
     * @private
     */
    _fm = null;

    /**
     * ссылка на менеджер диалогов
     * @type {PliziDialogsCollection}
     * @private
     */
    _dm = null;

    /**
     * ссылка на - менеджер инвайтов
     * @type {PliziInvitationsCollection}
     * @private
     */
    _im = null;

    /**
     * ссылка на менеджер нотификаций
     * @type {PliziNotificationsCollection}
     * @private
     */
    _nm = null;

    _isLoaded = false;

    /**
     * ссылка на менеджер френдов
     * @returns {PliziFriendsCollection}
     */
    get fm(){
        return this._fm;
    }

    /**
     * ссылка на менеджер диалогов
     * @returns {PliziDialogsCollection}
     */
    get dm(){
        return this._dm;
    }

    /**
     * ссылка на менеджер инвайтов
     * @returns {PliziInvitationsCollection}
     */
    get im(){
        return this._im;
    }

    /**
     * ссылка на менеджер нотификаций
     * @returns {PliziNotificationsCollection}
     */
    get nm(){
        return this._nm;
    }

    __isInit = false;

    /**
     * @param {PliziAPI|PliziAPIClass} apiObj
     */
    init(apiObj){
        if (this.__isInit)
            return;

        this._api = apiObj;

        this._user = new PliziAuthUser(null);

        this._fm = new PliziFriendsCollection(apiObj);
        this._dm = new PliziDialogsCollection(apiObj);
        this._im = new PliziInvitationsCollection(apiObj);
        this._nm = new PliziNotificationsCollection(apiObj);

        this.__isInit = true;
    }

    /**
     * загружаем тут данные которые пришли от метода api/user или из localStorage
     * @param {Object} inputData
     * @param {string} token
     */
    updateAuthUserData(inputData, token){
        this.token = token;
        this.channel = inputData.channel;

        this.user.updateAuthUser(inputData.data);

        this._isLoaded = true;

        this.storeUserData();
    }


    /**
     * сохраняет в localStorage (по ключу localStorageKey) данные юзера в строком виде
     * в том виде как это присылает api/user
     * @returns {string} - данные юзера в строком виде
     */
    storeUserData() {
        const jData = {
            data : this.user.toJSON(),
            channel : this.channel
        }

        const sData = JSON.stringify(jData);

        window.localStorage.setItem( this.__localStorageKey, sData );

        return sData;
    }


    /**
     * пытается восстановить данные юзера из localStorage
     * @returns {object|null} - данные юзера в виде объекта, если данные из localStorage
     */
    restoreData() {
        const sData = localStorage.getItem(this.__localStorageKey);

        if (typeof sData === 'undefined'  ||  sData===null  ||  sData==='')
            return null;

        const oData = JSON.parse(sData);

        return (oData  &&  oData.data  &&  oData.data.email  &&  oData.channel) ? oData : null;
    }

    /**
     * очищает данные
     */
    cleanData(){
        this._user.cleanData();
        this._isLoaded = false;

        localStorage.removeItem( this.__localStorageKey );
        localStorage.removeItem( 'pliziJWToken' );
        localStorage.removeItem( 'pliziChatChannel' );
        localStorage.removeItem( this.fm.localStorageKey );
        localStorage.removeItem( this.dm.localStorageKey );
        localStorage.removeItem( this.im.localStorageKey );
        localStorage.removeItem( this.nm.localStorageKey );
    }

    get isLoaded(){
        return this._isLoaded;
    }

    get user(){
        return this._user;
    }

    /**
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

        localStorage.setItem('pliziJWToken', this._token);
    }

    /**
     * @returns {string}
     */
    get channel(){
        return this._channel;
    }

    set channel(val){
        this._channel = val;

        localStorage.setItem('pliziChatChannel', this._channel);
    }
}

//export { PliziAuth as default}
export const PliziAuth = new PliziAuthClass();
