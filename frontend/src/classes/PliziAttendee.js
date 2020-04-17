class PliziAttendee{
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    /**
     * бэкенд сказал, что это поле удалят
     * @deprecated
     * @type {number}
     * @private
     */
    _chat_id = null;

    /**
     * дата рождения собеседника
     * @type {Date}
     * @private
     */
    _birthday = null;

    /**
     * город собеседника
     * @type {null}
     * @private
     */
    _city = null;

    /**
     * время последней активности собеседника
     * TODO: с бэка приходит как lastActivityDT
     * @type {Date}
     * @private
     */
    _lastActivity = null;

    /**
     * флаг собеседник
     * @type {Date}
     * @private
     */
    _isOnline = null;

    /**
     * аватарка собеседника
     * @type {string}
     * @private
     */
    _userPic = null;

    /**
     * имя собеседника
     * @type {string}
     * @private
     */
    _firstName = null;

    /**
     * фамилия собеседника
     * @type {string}
     * @private
     */
    _lastName = null;

    /**
     * пол собеседника
     * @type {string}
     * @private
     */
    _sex = null;

    constructor( attData ){
        this._chat_id = attData.chat_id;

        this._birthday = new Date(attData.birthday);
        this._city = attData.city;
        this._lastActivity = (attData.lastActivity  &&  !attData.lastActivityDT) ? new Date(attData.lastActivity) : null;

        // TODO: удалить когда lastActivityDT изменят на lastActivity
        this._lastActivity = (!attData.lastActivity  &&  attData.lastActivityDT) ? new Date(attData.lastActivityDT) : null;
        this._isOnline = attData.isOnline;

        this._userPic = attData.userPic;
        this._firstName = attData.firstName;
        this._lastName = attData.lastName;
        this._sex = attData.sex;
    }


    get birthday(){
        return this._birthday;
    }

    get city(){
        return this._city;
    }

    get lastActivity(){
        return this._lastActivity;
    }

    get isOnline(){
        return this._isOnline;
    }

    get userPic(){
        if (this._userPic!==``)
            return this._userPic;

        return this.__defaultAvatarPath;
    }

    get firstName(){
        return this._firstName;
    }

    get lastName(){
        return this._lastName;
    }

    get sex(){
        return this._sex;
    }

    toJSON(){
        /** @TGA чтобы momentJS не подключать **/
        let month = (this._birthday.getMonth()+1)+``;
        month = (month.length === 1) ? '0'+month : month;

        let day = this._birthday.getDay()+``;
        day = (day.length === 1) ? '0'+day : day;

        return {
            chat_id: this._chat_id,
            birthday: `${this._birthday.getFullYear()}-${month}-${day}`, // this._birthday - вернёт Date, а нам нужно в формате `YYYY-MM-DD`
            city: this.city,
            lastActivity: (this.lastActivity.getTime() / 1000) >>> 0,
            sex : this.sex,
            isOnline: this.isOnline,
            userPic: this._userPic,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}

export { PliziAttendee as default}
