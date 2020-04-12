class PliziUser {
    /**
     *
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
     * @type {string}
     * @private
     */
    _email = ``;

    /**
     *
     * @type {boolean}
     * @private
     */
    _isOnline = false;

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
    _birthDay = null;

    /**
     *
     * @type {string}
     * @private
     */
    _city = ``;

    /**
     *
     * @type {number}
     * @private
     */
    _relationship = 0;

    /**
     *
     * @type {string}
     * @private
     */
    _userPic = ``;

    /**
     *
     * @type {string}
     * @private
     */
    _country =  ``;

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

    // значения как в PHP
    __RELATIONSHIP_MARRIED = 1;
    __RELATIONSHIP_NOT_MARRIED = 2;

    constructor(){

    }

    /**
     * загружаем тут данные которые пришли от метода api/user
     * @param {Object} inputData
     */
    saveUserData(inputData){
        this._id = inputData.data.id >>> 0;
        this._email = (inputData.data.email+``).trim();
        this._isOnline = inputData.data.isOnline;

        const prof = inputData.data.profile;

        this._firstName = (prof.firstName+``).trim();
        this._lastName = (prof.lastName+``).trim();
        this._sex = (prof.sex+``).trim();
        this._birthDay = new Date((prof.birthday+``).trim());
        this._city = (prof.city+``).trim();
        this._relationship = prof.relationship >>> 0;

        if (prof.userPic) {
            this._userPic = (prof.userPic+``).trim();
        }

        // TODO @TGA удалить когда бэкендеры пофиксят
        if (prof.user_pic) {
            this._userPic = (prof.user_pic+``).trim();
        }

        // TODO: @TGA переписать потом на загрузку реальных данных
        this._country = ``;
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
    cleanData(){
        this._id = -1;
        this._email = ``;
        this._isOnline = false;

        this._firstName = ``;
        this._lastName = ``;
        this._sex = ``;
        this._birthDay = ``;
        this._city = ``;
        this._relationship = -1;
        this._userPic = ``;

        this._country = ``;
        this._created = null;
        this._updated = null;
        this._subscribersNumber = -1;
        this._friendsNumber = -1;
        this._photosNumber = -1;
        this._videosNumber = -1;
        this._audiosNumber = -1;

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
     *
     * @returns {string}
     */
    get email(){
        return this._email;
    }

    /**
     *
     * @returns {boolean}
     */
    get isOnline(){
        return this._isOnline;
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
     *
     * @returns {string}
     */
    get sex(){
        switch (this._sex) {
            case `m`: return 'мужской';
            case `f`: return 'женский';
            default: return 'не указано';
        }
    }

    /**
     *
     * @returns {Date}
     */
    get birthday(){
        return this._birthDay;
    }

    /**
     *
     * @returns {Date}
     */
    get birthDate(){
        return this._birthDay;
    }

    /**
     *
     * @returns {string}
     */
    get city(){
        return this._city;
    }

    /**
     *
     * @returns {string}
     */
    get country(){
        // TODO: @TGA убрать это когда будут реальные данные по стране у юзеров
        if (`` === this._country)
            return `Россия`;

        return this._country;
    }

    /**
     *
     * @returns {number}
     */
    get relationship(){
        return this._relationship;
    }

    get family(){
        if (0 === this._relationship)
            return `Не указано`;

        if (this.__RELATIONSHIP_MARRIED === this._relationship) {
            switch (this._sex) {
                case 'm': return `Женат`;
                case 'f': return `Замужем`;
                case 'n': return `В отношениях`;
            }
        }

        if (this.__RELATIONSHIP_NOT_MARRIED === this._relationship) {
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

    /**
     *
     * @returns {number}
     */
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
        let month = (this._birthDay.getMonth()+1)+``;
        month = (month.length === 1) ? '0'+month : month;

        let day = this._birthDay.getDay()+``;
        day = (day.length === 1) ? '0'+day : day;

        return {
            data: {
                id: this._id,
                email: this._email,
                isOnline: this._isOnline,
                profile: {
                    firstName: this._firstName,
                    lastName: this._lastName,
                    sex: this._sex,
                    birthday: `${this._birthDay.getFullYear()}-${month}-${day}`,
                    city: this._city,
                    relationship: this._relationship,
                    userPic: this._userPic
                }
            }
        };
    }

}

export { PliziUser as default}
