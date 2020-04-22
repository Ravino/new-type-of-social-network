import PliziUserPrivacySettings from "./PliziUserPrivacySettings.js";

class PliziUser {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    /**
     *
     * @type {boolean}
     * @private
     */
    __isDataReady = false;

    /**
     *
     * @type {number}
     * @private
     */
    _id = -1;

    /**
     *
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
     *
     * @type {string}
     * @private
     */
    _firstName = ``;

    /**
     *
     * @type {string}
     * @private
     */
    _lastName = ``;

    /**
     *
     * @type {string}
     * @private
     */
    _sex = `n`;

    /**
     *
     * @type {Date}
     * @private
     */
    _birthday = null;

    /**
     *
     * @type {Object[]|null}
     * @private
     */
    _city = {
        id: null,
        title: null,
    };

    /**
     *
     * @type {Object[]|null}
     * @private
     */
    _region = null;

    /**
     *
     * @type {Object[]|null}
     * @private
     */
    _country =  null;

    /**
     *
     * @type {number}
     * @private
     */
    _relationshipId = 0;

    /**
     *
     * @type {string}
     * @private
     */
    _userPic = ``;

    /**
     *
     * @type {Date|null}
     * @private
     */
    _created = null;

    /**
     *
     * @type {Date|null}
     * @private
     */
    _updated = null;

    /**
     *
     * @type {number}
     * @private
     */
    _subscribersNumber = 0;

    /**
     *
     * @type {number}
     * @private
     */
    _friendsNumber = 0;

    /**
     *
     * @type {number}
     * @private
     */
    _photosNumber = 0;

    /**
     *
     * @type {number}
     * @private
     */
    _videosNumber = 0;

    /**
     *
     * @type {number}
     * @private
     */
    _audiosNumber = 0;

    /**
     * @type {PliziUserPrivacySettings|null}
     * @private
     */
    _privacySettings = null;

    // значения как в PHP
    __RELATIONSHIP_MARRIED = 1;
    __RELATIONSHIP_NOT_MARRIED = 2;

    /**
     * @param {object} usrData
     */
    constructor(usrData) {
        if (usrData && typeof usrData === 'object' && Object.keys(usrData).length > 0) {
            this.saveUserData(usrData);
        }
    }

    /**
     * загружаем тут данные которые пришли от метода api/user
     * @param {Object} inputData
     */
    saveUserData(inputData) {
        if (typeof inputData.data === `undefined`) {
            inputData = {data: inputData};
        }

        this._id = inputData.data.id >>> 0;
        this._isOnline = inputData.data.isOnline;
        this._lastActivity = new Date(inputData.data.lastActivity);

        const prof = inputData.data.profile;
        const privacySettings = inputData.data.privacySettings;

        this._firstName = (prof.firstName + ``).trim();
        this._lastName = (prof.lastName + ``).trim();
        this._sex = (prof.sex + ``).trim();
        this._birthday = new Date((prof.birthday + ``).trim());
        this._relationshipId = prof.relationshipId;

        if (prof.location) {
            this._city = {
                id: prof.location.id,
                title: prof.location.title,
            };
            this._region = prof.location.region;
            this._country = prof.location.country;
        }

        if (prof.userPic) {
            this._userPic = (prof.userPic + ``).trim();
        }

        if (privacySettings) {
            this._privacySettings = new PliziUserPrivacySettings(privacySettings);
        }

        // TODO: @TGA переписать потом на загрузку реальных данных
        this._created = new Date();
        this._updated = new Date();
        this._subscribersNumber = Math.floor(Math.random() * 10000);
        this._friendsNumber = Math.floor(Math.random() * 3000);
        this._photosNumber = Math.floor(Math.random() * 10000);
        this._videosNumber = Math.floor(Math.random() * 100);
        this._audiosNumber = Math.floor(Math.random() * 5000);

        this.__isDataReady = true;
    }


    /**
     * очищает данные
     */
    cleanData() {
        this._id = -1;
        this._isOnline = false;
        this._lastActivity = null;

        this._firstName = ``;
        this._lastName = ``;
        this._sex = ``;
        this._birthday = null;

        this._city = {
            id: null,
            title: null,
        };

        this._region = null;
        this._country = null;
        this._relationshipId = -1;
        this._userPic = ``;

        this._created = null;
        this._updated = null;
        this._subscribersNumber = -1;
        this._friendsNumber = -1;
        this._photosNumber = -1;
        this._videosNumber = -1;
        this._audiosNumber = -1;

        this._privacySettings = null;

        this.__isDataReady = false;
    }


    /**
     *
     * @returns {string}
     */
    get defaultAvatar() {
        return this.__defaultAvatarPath;
    }

    /**
     *
     * @returns {boolean}
     */
    get isDataReady(){
        return this.__isDataReady;
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


    /**
     *
     * @returns {string}
     */
    get firstName(){
        return this._firstName.trim();
    }

    /**
     *
     * @returns {string}
     */
    get lastName(){
        return this._lastName.trim();
    }

    /**
     *
     * @returns {string}
     */
    get fullName(){
        return `${this._firstName.trim()} ${this._lastName.trim()}`;
    }

    /**
     * Возвращает пол в человеческом виде.
     * @returns {string}
     */
    get sexShow(){
        switch (this._sex) {
            case `m`: return 'мужской';
            case `f`: return 'женский';
            default: return 'не указано';
        }
    }

    /**
     *
     * @returns {string}
     */
    get sex() {
        return this._sex.trim();
    }

    /**
     *
     * @returns {Date}
     */
    get birthday(){
        return this._birthday;
    }

    /**
     *
     * @returns {Object[]|null}
     */
    get city(){
        return this._city;
    }

    /**
     *
     * @returns {Object[]|null}
     */
    get region(){
        return this._region;
    }

    /**
     *
     * @returns {Object[]|null}
     */
    get country(){
        return this._country;
    }

    /**
     *
     * @returns {number}
     */
    get relationshipId(){
        return this._relationshipId;
    }

    get family(){
        if (0 === this._relationshipId)
            return `Не указано`;

        if (this.__RELATIONSHIP_MARRIED === this._relationshipId) {
            switch (this._sex) {
                case 'm': return `Женат`;
                case 'f': return `Замужем`;
                case 'n': return `В отношениях`;
            }
        }

        if (this.__RELATIONSHIP_NOT_MARRIED === this._relationshipId) {
            switch (this._sex) {
                case 'm': return `Не женат`;
                case 'f': return `Не замужем`;
                case 'n': return `В поиске`;
            }
        }

        return `Не указано`;
    }

    /**
     *
     * @returns {string}
     */
    get userPic(){
        if (this._userPic!==``)
            return this._userPic;

        return this.__defaultAvatarPath;
    }

    /**
     * устанавливает юзерский аватар
     * @param {string} picPath
     */
    set userPic(picPath) {
        this._userPic = picPath;
    }

    /**
     *
     * @returns {Date}
     */
    get created(){
        return this._created;
    }

    /**
     *
     * @returns {Date}
     */
    get updated(){
        return this._updated;
    }

    /**
     *
     * @returns {number}
     */
    get subscribersNumber(){
        return this._subscribersNumber;
    }

    /**
     *
     * @returns {number}
     */
    get friendsNumber(){
        return this._friendsNumber;
    }

    get photosNumber(){
        return this._photosNumber;
    }

    /**
     *
     * @returns {number}
     */
    get videosNumber(){
        return this._videosNumber;
    }

    /**
     *
     * @returns {number}
     */
    get audiosNumber(){
        return this._audiosNumber;
    }

    /**
     * @returns {PliziUserPrivacySettings|null}
     */
    get privacySettings() {
        return this._privacySettings;
    }

    /**
     * возвращает данные юзера в том виде как их воазващает api/user
     * @returns {string}
     */
    toString(){
        return JSON.stringify( this.toJSON() )
    }

    /**
     * возвращает данные юзера в том виде как их воазващает api/user
     * @returns {Object}
     */
    toJSON() {
        /** @TGA чтобы momentJS не подключать **/
        let month = (this._birthday.getMonth() + 1) + ``;
        month = (month.length === 1) ? '0' + month : month;

        let day = this._birthday.getDay() + ``;
        day = (day.length === 1) ? '0' + day : day;

        return {
            data: {
                id: this._id,
                isOnline: this._isOnline,
                lastActivity: +(+this._lastActivity / 1000).toFixed(0),
                profile: {
                    firstName: this._firstName,
                    lastName: this._lastName,
                    sex: this._sex,
                    birthday: `${this._birthday.getFullYear()}-${month}-${day}`, // this._birthday - вернёт Date, а нам нужно в формате `YYYY-MM-DD`
                    location: {
                        id: this._city.id,
                        title: this._city.title,
                        region: this._region,
                        country: this._country,
                    },
                    city: this._city,
                    relationshipId: this._relationshipId,
                    userPic: this._userPic
                },
                privacySettings: this._privacySettings,
            }
        };
    }

}

export {PliziUser as default}
