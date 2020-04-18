class PliziMessage{
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    /**
     * ID сообщения
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * имя отправителя сообщения
     * @type {string}
     * @private
     */
    _firstName = null;

    /**
     * фамилия отправителя сообщения
     * @type {string}
     * @private
     */
    _lastName = null;

    /**
     * аватарка отправителя сообщения
     * @type {string}
     * @private
     */
    _userPic = null;

    /**
     * пол отправителя сообщения
     * @type {string}
     * @private
     */
    _sex = null;

    /**
     * текст сообщения
     * @type {string}
     * @private
     */
    _body = null;

    /**
     * флаг: моё || не моё сообщение
     * @type {boolean}
     * @private
     */
    _isMine = null;

    /**
     * флаг прочитано ли сообщение
     * @type {boolean}
     * @private
     */
    _isRead = null;

    /**
     * флаг, было ли сообщение отредактировано
     * @type {boolean}
     * @private
     */
    _isEdited = null;

    /**
     * метка времени, когда было создано сообщение
     * @type {Date|number}
     * @private
     */
    _createdAt = null;

    /**
     * метка времени, когда сообщение было изменено
     * @type {Date|number}
     * @private
     */
    _updatedAt = null;

    /**
     * ссылка на сообщение, которое было процитировано
     * @type {object}
     * @private
     */
    _replyOn = null;

    /**
     * флаг, что сообщение было переотправлено (форвардинг)
     * @type {boolean}
     * @private
     */
    _isForward = null;

    /**
     * объект с аттачментами
     * @type {object}
     * @private
     */
    _attachments = null;


    constructor(msgData){
        this._id = msgData.id >>> 0;
        this._firstName = msgData.firstName;
        this._lastName = msgData.lastName;
        this._userPic = msgData.userPic;
        this._sex = msgData.sex;
        this._body = msgData.body;
        this._isMine = !! msgData.isMine;
        this._isRead = !! msgData.isRead;
        this._isEdited = !! msgData.isEdited;
        this._createdAt = new Date(msgData.createdAt);
        this._updatedAt = new Date(msgData.updatedAt);
        this._replyOn = msgData.replyOn;
        this._isForward = !! msgData.isForward;
        this._attachments = msgData.attachments;
    }

    get id(){
        return this._id;
    }

    get firstName(){
        return this._firstName;
    }

    get lastName(){
        return this._lastName;
    }

    get userPic(){
        if (this._userPic!==``)
            return this._userPic;

        return this.__defaultAvatarPath;
    }

    get sex(){
        return this._sex;
    }

    get body(){
        return this._body;
    }

    get isMine(){
        return this._isMine;
    }

    get isRead(){
        return this._isRead;
    }

    get isEdited(){
        return this._isEdited;
    }

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

    get replyOn(){
        return this._replyOn;
    }

    get isForward(){
        return this._isForward;
    }

    get isReply(){
        return !!this._replyOn;
    }

    get attachments(){
        return this._attachments;
    }

    /**
     * TODO: потом изменить с учётом реальных данных
     * @returns {boolean}
     */
    get isAttachments(){
        return false;
    }
}

export { PliziMessage as default}
