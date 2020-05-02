import PliziAPI from './PliziAPI.js';
import PliziAuthUser from './PliziAuthUser.js';

import PliziNotification from './PliziNotification.js';

import PliziFriendsManager from './PliziFriendsManager.js';

import PliziDialogsCollection from './Collection/PliziDialogsCollection.js';
import PliziInvitationsCollection from './Collection/PliziInvitationsCollection.js';

class PliziAuth {
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
     * @type {PliziNotification[]}
     * @private
     */
    _notifications = [];

    /**
     * ссылка на менеджер френдов
     * @type {PliziFriendsManager}
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
     * ссылка на менеджер френдов
     * @returns {PliziFriendsManager}
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
     * @param {PliziAPI} apiObj
     */
    constructor(apiObj){
        this._api = apiObj;

        this._user = new PliziAuthUser(null);

        this._fm = new PliziFriendsManager(apiObj);
        this._dm = new PliziDialogsCollection(apiObj);
        this._im = new PliziInvitationsCollection(apiObj);
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

        localStorage.removeItem( this.__localStorageKey );
        localStorage.removeItem( 'pliziJWToken' );
        localStorage.removeItem( 'pliziChatChannel' );
        localStorage.removeItem( this.dm.localStorageKey );
        localStorage.removeItem( this.im.localStorageKey );
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

/** **************************************************************************************************************** **/
/** **************************************************************************************************************** **/
/** **************************************************************************************************************** **/


    /**
     * @returns {number}
     */
    get notificationsNumber(){
        return this._notifications.length;
    }

    /**
     * @returns {PliziNotification[]}
     */
    get notifications(){
        return this._notifications;
    }

    notificationsClean(){
        this._notifications = [];
    }


    /**
     * должен получать респонс от сервера, сам преобразует в коллекцию PliziNotification
     * @param {object[]} notifs
     */
    notificationsLoad(notifs){
        this.notificationsClean();

        notifs.map( (invItem) => {
            this._notifications.push( new PliziNotification(invItem) );
        });
    }

}

export { PliziAuth as default}
