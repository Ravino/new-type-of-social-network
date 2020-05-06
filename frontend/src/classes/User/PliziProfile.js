import PliziLocation from './PliziLocation.js';

class PliziUser {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

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
     * @type {PliziLocation}
     * @private
     */
    _location = null;

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

    // значения как в PHP
    __RELATIONSHIP_MARRIED = 1;
    __RELATIONSHIP_NOT_MARRIED = 2;

    /**
     * @param {object} prof
     */
    constructor(prof) {
        this._firstName = (prof.firstName + ``).trim();
        this._lastName = (prof.lastName + ``).trim();
        this._sex = (prof.sex + ``).trim();
        this._birthday = new Date((prof.birthday + ``).trim());
        this._relationshipId = prof.relationshipId;

        this._location = (prof.location) ? new PliziLocation(prof.location) : null;

        if (prof.userPic) {
            this._userPic = (prof.userPic + ``).trim();
        }
    }

    /**
     * @returns {string}
     */
    get firstName(){
        return this._firstName.trim();
    }

    /**
     * @returns {string}
     */
    get lastName(){
        return this._lastName.trim();
    }

    /**
     * @returns {string}
     */
    get fullName(){
        return `${this._firstName.trim()} ${this._lastName.trim()}`;
    }

    /**
     * Возвращает пол в "человеческом" виде.
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
     * @returns {string}
     */
    get sex() {
        return this._sex.trim();
    }

    /**
     * @returns {Date}
     */
    get birthday(){
        return this._birthday;
    }

    /**
     * @returns {PliziLocation|null}
     */
    get location(){
        return this._location;
    }

    /**
     * @returns {number}
     */
    get relationshipId(){
        return this._relationshipId;
    }

    get family(){
        if (3 === this._relationshipId)
            return `В активном поиске`;

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
     * @returns {string}
     */
    toString(){
        return JSON.stringify( this.toJSON() );
    }

    /**
     * возвращает данные юзера в том виде как их возвращает API
     * @returns {Object}
     */
    toJSON() {
        /** @TGA чтобы momentJS не подключать **/
        let month = (this._birthday.getMonth() + 1) + ``;
        month = (month.length === 1) ? '0' + month : month;

        let day = this._birthday.getDay() + ``;
        day = (day.length === 1) ? '0' + day : day;

        return {
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
            birthday: `${this._birthday.getFullYear()}-${month}-${day}`, // this._birthday - вернёт Date, а нам нужно в формате `YYYY-MM-DD`
            location: (this._location) ? this.location.toJSON() : null,
            relationshipId: this.relationshipId,
            userPic: this._userPic // реальный
        };
    }

}

export {PliziUser as default}
