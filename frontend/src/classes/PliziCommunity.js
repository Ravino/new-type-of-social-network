class PliziCommunity {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = '/images/plizi-noPrimaryImage-256.png';

    /**
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * @type {string}
     * @private
     */
    _name = null;

    /**
     * @type {string}
     * @private
     */
    _description = null;

    /**
     * @type {string}
     * @private
     */
    _location = null;

    /**
     * @type {string}
     * @private
     */
    _notice = null;

    /**
     * @type {string}
     * @private
     */
    _primaryImage = null;

    /**
     * @type {string}
     * @private
     */
    _url = null;

    /**
     * @type {string}
     * @private
     */
    _website = null;

    constructor(inputData){
        this._id = inputData.id;
        this._name = inputData.name;
        this._description = inputData.description;
        this._location = inputData.location;
        this._notice = inputData.notice;
        this._primaryImage = inputData.primaryImage;
        this._url = inputData.url;
        this._website = inputData.website;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get description(){
        return this._description;
    }

    get location(){
        return this._location;
    }

    get notice(){
        return this._notice;
    }

    get primaryImage(){
        if (this._primaryImage)
            return this._primaryImage;

        return this.__defaultAvatarPath;
    }

    get url(){
        return this._url;
    }

    get website(){
        return this._website;
    }
}

export { PliziCommunity as default}
