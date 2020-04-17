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
     * @type {null}
     * @private
     */
    _sex = null;

    /**
     * пол
     * @type {null}
     * @private
     */
    _body = null;

    _isMine = null;
    _isRead = null;
    _isEdited = null;
    _createdAt = null;
    _updatedAt = null;
    _attachments = null;
    _replyOn = null;
    _isForward = null;
}

export { PliziMessage as default}
