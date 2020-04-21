class PliziCommunity {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

    _id = null;

    _name = null;

    _description = null;

    _location = null;

    _notice = null;

    _primaryImage = null;

    _url = null;

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
        if (this._primaryImage !== ``)
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
