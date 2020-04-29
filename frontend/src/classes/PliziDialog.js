import PliziAttendee from './PliziAttendee.js';

class PliziDialog{

    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    /**
     * ID диалога (чата)
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * пока не используется, в будущем возможно имя группового чата
     * @deprecated
     * @type {string}
     * @private
     */
    _name = null;

    /**
     * текст последнего сообщений
     * @type {string}
     * @private
     */
    _lastMessageText = null;

    /**
     * метка времени UNIX последнего сообщения
     * @type {Date|number}
     * @private
     */
    _lastMessageDT = null;

    /**
     * было ли прочитано последнее сообщение
     * @type {boolean}
     * @private
     */
    _isRead = null;

    /**
     * от меня ли было последнее сообщение
     * @type {boolean}
     * @private
     */
    _isLastFromMe = null;

    /**
     * участники чата
     * @type {PliziAttendee[]}
     * @private
     */
    _attendees = null;


    constructor(dialogData){
        this._id = dialogData.id;
        this._name = dialogData.name;
        this._lastMessageText = dialogData.lastMessageText;
        this._lastMessageDT = this.__convertToDate(dialogData.lastMessageDT);
        this._isRead = dialogData.isRead;
        this._isLastFromMe = dialogData.isLastFromMe;

        this._attendees = [];
        dialogData.attendees.map( (aItem) => {
            this._attendees.push( new PliziAttendee(aItem) );
        });
    }

    /**
     * @param {Date|number} dValue
     * @returns {Date}
     * @private
     */
    __convertToDate(dValue){
        /** @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date **/
        if (dValue instanceof Date) {
            return new Date( dValue.valueOf() ); // чтобы вернуть по значению, а не по ссылке
        }

        return new Date(dValue*1000);  // умножаем на 1000 потому, что тут JS считает в миллисекундах
    }

    toJSON(){
        let atts = [];

        this._attendees.map( (aItem) => {
            atts.push( aItem.toJSON() );
        });

        return {
            id: this.id,
            name: this.name,
            lastMessageText: this.lastMessageText,
            lastMessageDT: +(+this.lastMessageDT.valueOf() / 1000).toFixed(0),
            isRead: this.isRead,
            isLastFromMe: this.isLastFromMe,
            attendees: atts
        }
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get lastMessageText(){
        return this._lastMessageText;
    }

    get lastMessageDT(){
        return this._lastMessageDT;
    }

    get lastMessageUnix(){
        return this._lastMessageDT.getTime();
    }

    get isRead(){
        return this._isRead;
    }

    get isLastFromMe(){
        return this._isLastFromMe;
    }

    get isPrivate(){
        return (this._attendees.length === 1);
    }

    get isGroup(){
        return (this._attendees.length >= 2);
    }

    get attendeesName(){
        return this._attendees.map( aItem => aItem.firstName );
    }

    /**
     * @returns {PliziAttendee[]}
     */
    get attendees(){
        return this._attendees;
    }

    get attendeesIds(){
        return this._attendees.map( aItem => aItem.id );
    }

    /**
     * @returns {PliziAttendee}
     */
    get companion(){
        return this.attendees[0];
    }

    set lastMessageText( value ){
        this._lastMessageText = value.trim();
    }

    /**
     * @param {number|date} value
     */
    set lastMessageDT( value ){
        this._lastMessageDT = new Date(value);
    }

    get lastMessageUnixTime(){
        return (this._lastMessageDT.getTime() / 1000) >>> 0;
    }

    set isRead( value ){
        this._isRead = !!value;
    }

    set isLastFromMe( value ){
        this._isLastFromMe = !!value;
    }

    checkInAttendees(txt){
        let isFound = false;
        txt = txt.toLowerCase();

        this._attendees.map( (aItem) => {
            if (aItem.firstName.toLowerCase().includes(txt)  ||  aItem.lastName.toLowerCase().includes(txt)) {
                isFound = true;
            }
        });

        return isFound;
    }

    stateUpdate(updatedData) {
        this.lastMessageDT = updatedData.lastMessageDT;
        this.lastMessageText = updatedData.lastMessageText;
        this.isLastFromMe = updatedData.isLastFromMe;
        this.isRead = updatedData.isRead;
    }
}

export { PliziDialog as default}
