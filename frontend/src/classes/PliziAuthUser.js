import PliziUzer from './PliziUser.js';
import PliziInvitation from './PliziInvitation.js';
import PliziNotification from './PliziNotification.js';
import PliziDialog from './PliziDialog.js';

class PliziAuthUser extends PliziUzer{
    /**
     * ключ в localStorage куда сохраняем данные юзера
     * @type {string}
     * @private
     */
    __localStorageKey = `pliziUser`;

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
     * @type {PliziInvitation[]}
     * @private
     */
    _invitations = [];

    /**
     * @type {PliziNotification[]}
     * @private
     */
    _notifications = [];

    /**
     * список диалогов
     * @type {PliziDialog[]}
     * @private
     */
    _dialogs = [];


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
     * @returns {PliziInvitation[]}
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
     * должен получать респонс от сервера, сам преобразует в коллекцию PliziInvitation
     * @param {object[]} invs
     */
    invitationsLoad(invs){
        this.invitationsClean();

        invs.map( (invItem) => {
            this._invitations.push( new PliziInvitation({ data : invItem} ) );
        });
    }

    /**
     * объект который надо удалить
     * @param {PliziInvitation|{id:number}} invit
     */
    invitationRemove(invit){
        this._invitations = this._invitations.filter((invItem) => {
            return invItem.id !== invit.id;
        });
    }

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

    get dialogsNumber(){
        return this._dialogs.length;
    }

    get dialogs(){
        return this._dialogs;
    }

    /**
     *
     * @param {PliziDialog} d1
     * @param {PliziDialog} d2
     * @returns {number}
     * @private
     */
    __dialogCompare(d1, d2){
        const t1 = d1.lastMessageUnixTime;
        const t2 = d2.lastMessageUnixTime;

        if (t1 > t2) return -1;
        if (t2 > t1) return 1;

        return 0;
    }

    /**
     * возвращает первый (нулевой) диалог из списка диалогов, или NULL если список диалогов пустой
     * @returns {PliziDialog|null}
     */
    get firstDialog(){
        if (this._dialogs.length > 0)
            return this._dialogs[0];

        return null;
    }


    /**
     * поиск диалога по его ID
     * @param {number} dialogID - ID нужного диалога
     * @returns {PliziDialog|null} - нужный диалог как объект типа PliziDialog, или NULL если не нашли
     */
    dialogsSearch(dialogID){
        let found = null;

        // TODO: @TGA перевести потом на .filter
        this.dialogs.map( (dItem) => {
            if (dialogID === dItem.id) {
                found = dItem;
            }
        });

        return found;
    }

    dialogsRearrange(){
        window.console.log(`dialogsRearrange`);
        this._dialogs = this._dialogs.slice().sort(this.__dialogCompare);
    }

    /**
     *
     * @param {number} dialogID - ID диалога который нужно обновить
     * @param {object} updatedData - объект с полями lastMessageDT, lastMessageText, isLastFromMe, isRead
     */
    dialogStateUpdated(dialogID, updatedData){
        let dlg = this.dialogsSearch(dialogID);

        if (dlg) {
            dlg.stateUpdate(updatedData);
        }
        else {
            window.console.warn(`PliziAuthUser->dialogStateUpdated: диалог с ID ${dialogID} не найден!`);
        }
    }

    dialogsClean(){
        this._dialogs = [];
    }

    /**
     * должен получать респонс от сервера, сам преобразует в коллекцию PliziDialog
     * @param {object[]} dialogs
     */
    dialogsLoad(dialogs){
        this.dialogsClean();

        dialogs.map( (invItem) => {
            this._dialogs.push( new PliziDialog(invItem) );
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


    toJSON() {
        let res = super.toJSON();
        res.channel = this._channel;
        res.email = this._email;

        return res;
    }
}

export { PliziAuthUser as default}
