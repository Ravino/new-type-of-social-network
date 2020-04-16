class PliziPost {
    /**
     * @type {null}
     * @private
     */
    _id = null;

    /**
     * @type {null}
     * @private
     */
    _name = null;

    /**
     * @type {null}
     * @private
     */
    _body = null;

    /**
     * @type {null}
     * @private
     */
    _primaryImage = null;

    /**
     * @type {null}
     * @private
     */
    _likes = null;

    /**
     * @type {null}
     * @private
     */
    _views = null;

    /**
     * @type {null}
     * @private
     */
    _commentsCount = null;

    /**
     * @type {null}
     * @private
     */
    _sharesCount = null;

    /**
     * @type {null}
     * @private
     */
    _user = null;

    /**
     * @type {null}
     * @private
     */
    _community = null;

    /**
     * @type {null}
     * @private
     */
    _createdAt = null;

    get id() {
        return this._id;
    }

    get name() {
        return this._name
    }

    get body() {
        return this._body;
    }

    get primaryImage() {
        return this._primaryImage
    }

    get likes() {
        return this._likes;
    }

    get views() {
        return this._views
    }

    get user() {
        return this._user;
    }

    get community() {
        return this._community;
    }

    get commentsCount() {
        return this._commentsCount;
    }

    get sharesCount() {
        return this._sharesCount;
    }

    get createdAt() {
        return this._createdAt;
    }

    constructor(post) {
        this.update(post);
    }

    update(post) {
        for (let prop in post) {
            this['_' + prop] = post[prop];
        }
    };
}

export { PliziPost as default}
