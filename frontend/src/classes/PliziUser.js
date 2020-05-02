import PliziProfile from './User/PliziProfile.js';

class PliziUser {
    /**
     * @type {number}
     * @private
     */
    _id = -1;

    /**
     * @type {boolean}
     * @private
     */
    _isOnline = false;

    /**
     * метка времени когда у юзера была последняя актиновсть
     * @type {Date}
     * @private
     */
    _lastActivity = null;

    /**
     * @type {PliziProfile}
     * @private
     */
    _profile = null;

    /**
     * кол-во общих друзей
     * @type {number}
     * @private
     */
    _mutualFriendsCount = null;

    /**
     * @type {number}
     * @private
     */
    _subscribersNumber = 0;

    /**
     * @type {number}
     * @private
     */
    _friendsNumber = 0;

    /**
     * @type {number}
     * @private
     */
    _photosNumber = 0;

    /**
     * @type {number}
     * @private
     */
    _videosNumber = 0;

    /**
     * @type {number}
     * @private
     */
    _audiosNumber = 0;

    /**
     * @param {object} usrData
     */
    constructor(usrData) {
        if (usrData && typeof usrData === 'object' && Object.keys(usrData).length > 0) {
            this.updateUserData(usrData);
        }
    }

    /**
     * @param {Object} inputData
     */
    updateUserData(inputData) {
        this._id = inputData.id;
        this._isOnline = inputData.isOnline;
        this._lastActivity = new Date(inputData.lastActivity);

        this._profile = new PliziProfile(inputData.profile);

        // TODO: @TGA переписать потом на загрузку реальных данных
        this._subscribersNumber = Math.floor(Math.random() * 10000);
        this._friendsNumber = Math.floor(Math.random() * 3000);
        this._photosNumber = Math.floor(Math.random() * 10000);
        this._videosNumber = Math.floor(Math.random() * 100);
        this._audiosNumber = Math.floor(Math.random() * 5000);
    }

    /**
     *
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * @returns {boolean}
     */
    get isOnline(){
        return this._isOnline;
    }

    /**
     * @returns {Date}
     */
    get lastActivity(){
        return this._lastActivity;
    }

    get lastActivityUnixTime(){
        return (this._lastActivity.getTime() / 1000) >>> 0;
    }

    /**
     * @param {number|string|Date} lastActivityDT
     */
    set lastActivity(lastActivityDT){
        this._lastActivity = new Date(lastActivityDT);
    }

    get profile(){
        return this._profile;
    }

    get mutualFriendsCount(){
        return this._mutualFriendsCount;
    }

    /**
     * @returns {string}
     */
    get firstName(){
        return this.profile.firstName;
    }

    /**
     * @returns {string}
     */
    get lastName(){
        return this.profile.lastName;
    }

    /**
     *
     * @returns {string}
     */
    get fullName(){
        return `${this.profile.firstName} ${this.profile.lastName}`;
    }

    /**
     * @returns {string}
     */
    get sex() {
        return this.profile.sex;
    }

    /**
     * @returns {Date}
     */
    get birthday(){
        return this.profile.birthday;
    }

    /**
     * @returns {*}
     */
    get location(){
        return this.profile.location;
    }

    /**
     * @returns {Object|null}
     */
    get city(){
        const loc = this.profile.location;

        if (!loc)
            return null;

        return {
            id: loc.id,
            title: loc.title,
        };
    }

    /**
     * @returns {Object|null}
     */
    get region(){
        const loc = this.profile.location;

        if (!loc)
            return null;

        return {
            id: loc.region.id,
            title: loc.region.title,
        };
    }

    /**
     * @returns {Object|null}
     */
    get country(){
        const loc = this.profile.location;

        if (!loc)
            return null;

        return {
            id: loc.country.id,
            title: loc.country.title,
        };
    }

    /**
     * @returns {number}
     */
    get relationshipId(){
        return this.profile.relationshipId;
    }

    get family(){
        return this.profile.family;
    }

    /**
     * @returns {string}
     */
    get userPic(){
        return this.profile.userPic;
    }

    /**
     * устанавливает юзерский аватар
     * @param {string} picPath
     */
    set userPic(picPath) {
        this.profile.userPic = picPath;
    }

    /**
     * @returns {string}
     */
    toString(){
        return JSON.stringify( this.toJSON() );
    }

    /**
     * возвращает данные юзера в том виде как их воазващает api/user/search
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this._id,
            isOnline: this._isOnline,
            lastActivity: this._lastActivity.valueOf(),
            profile: this.profile.toJSON(),
            mutualFriendsCount: this.mutualFriendsCount
        };
    }

    get subscribersNumber(){
        return this._subscribersNumber;
    }

    get friendsNumber(){
        return this._friendsNumber;
    }

    get photosNumber(){
        return this._photosNumber;
    }

    get videosNumber(){
        return this._videosNumber;
    }

    get audiosNumber(){
        return this._audiosNumber;
    }

}

export {PliziUser as default}
