import { convertToDate } from '../utils/DateUtils.js';

class PliziAttendee{
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    /**
     * ID собеседника
     * @type {number}
     * @private
     */
    _id = null;

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
        this._id = attData.id;
        this._lastActivity = attData.lastActivity ? convertToDate(attData.lastActivity) : this.lastActivity;
        this._isOnline = attData.isOnline;
        this._userPic = attData.userPic;
        this._firstName = attData.firstName;
        this._lastName = attData.lastName;
        this._sex = attData.sex;
    }


    get id(){
        return this._id;
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

    get fullName(){
        return this._firstName +` `+ this._lastName;
    }

    get sex(){
        return this._sex;
    }

    toJSON(){
        return {
            id: this.id,
            lastActivity: this.lastActivity ? (this.lastActivity.valueOf() / 1000) : this.lastActivity,
            userPic: this._userPic,
            firstName: this.firstName,
            lastName: this.lastName,
            isOnline: this.isOnline,
            sex : this.sex
        }
    }
}

export { PliziAttendee as default}
