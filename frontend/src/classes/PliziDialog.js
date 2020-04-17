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
     * * пока не используется, в будущем возможно аватарка группового чата
     * @deprecated
     * @type {string}
     * @private
     */
    _userPic = null;

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
     * онлайн (кто?)
     * @deprecated
     * @type {boolean}
     * @private
     */
    _isOnline = null;

    /**
     * участники чата
     * @type {PliziAttendee[]}
     * @private
     */
    _attendees = null;


    constructor(dialogData){
        this._id = dialogData.id;
        this._name = dialogData.name;
        this._userPic = dialogData.userPic;
        this._lastMessageText = dialogData.lastMessageText;
        this._lastMessageDT = new Date(dialogData.lastMessageDT);
        this._isRead = dialogData.isRead;
        this._isLastFromMe = dialogData.isLastFromMe;
        this._isOnline = dialogData.isOnline;

        this._attendees = [];
        dialogData.attendees.map( (aItem) => {
            this._attendees.push( new PliziAttendee(aItem) );
        });
    }

    toJSON(){
        let atts = [];

        this._attendees.map( (aItem) => {
            atts.push( aItem.toJSON() );
        });

        return {
            id: this.id,
            name: this.name,
            userPic: this.userPic,
            lastMessageText: this.lastMessageText,
            lastMessageDT: (this.lastMessageDT.getTime() / 1000) >>> 0,
            isRead: this.isRead,
            isLastFromMe: this.isLastFromMe,
            isOnline: this.isOnline,
            attendees: atts
        }
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get userPic(){
        if (this._userPic!==``)
            return this._userPic;

        return this.__defaultAvatarPath;
    }

    get lastMessageText(){
        return this._lastMessageText;
    }

    get lastMessageDT(){
        return this._lastMessageDT;
    }

    get isRead(){
        return this._isRead;
    }

    get isLastFromMe(){
        return this._isLastFromMe;
    }

    get isOnline(){
        return this._isOnline;
    }

    get attendees(){
        return this._attendees;
    }

}

export { PliziDialog as default}
