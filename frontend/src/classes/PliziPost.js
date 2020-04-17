class PliziPost {
    /**
     * @type {number|null}
     * @private
     */
    _id = null;

    /**
     * @type {string|null}
     * @private
     */
    _name = null;

    /**
     * @type {string|null}
     * @private
     */
    _body = null;

    /**
     * @type {array|null}
     * @private
     */
    _primaryImage = null;

    /**
     * @type {number|null}
     * @private
     */
    _likes = null;

    /**
     * @type {number|null}
     * @private
     */
    _views = null;

    /**
     * @type {number|null}
     * @private
     */
    _commentsCount = null;

    /**
     * @type {number|null}
     * @private
     */
    _sharesCount = null;

    /**
     * @type {object[]|null}
     * @private
     */
    _user = null;

    /**
     * @type {object[]|null}
     * @private
     */
    _community = null;

    /**
     * @type {date|null}
     * @private
     */
    _createdAt = null;

    /**
     * @returns {number}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._name
    }

    /**
     * @returns {string}
     */
    get body() {
        return this._body;
    }

    /**
     * @returns {Array}
     */
    get primaryImage() {
        return this._primaryImage
    }

    /**
     * @returns {number}
     */
    get likes() {
        return this._likes;
    }

    /**
     * @returns {number}
     */
    get views() {
        return this._views
    }

    /**
     * @returns {Object[]}
     */
    get user() {
        return this._user;
    }

    /**
     * @returns {Object[]}
     */
    get community() {
        return this._community;
    }

    /**
     * @returns {number}
     */
    get commentsCount() {
        return this._commentsCount;
    }

    /**
     * @returns {number}
     */
    get sharesCount() {
        return this._sharesCount;
    }

    /**
     * @returns {date}
     */
    get createdAt() {
        return this._createdAt;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set body(value) {
        this._body = value;
    }

    set primaryImage(value) {
        this._primaryImage = value;
    }

    set likes(value) {
        this._likes = value;
    }

    set views(value) {
        this._views = value;
    }

    set commentsCount(value) {
        this._commentsCount = value;
    }

    set sharesCount(value) {
        this._sharesCount = value;
    }

    set user(value) {
        this._user = value;
    }

    set community(value) {
        this._community = value;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    constructor(post) {
        this.update(post);
    }

    /**
     * Обновление поста.
     * @param post
     */
    update(post) {
        this.id = post.id;
        this.name = post.name;
        this.body = post.body;
        this.primaryImage = post.primaryImage;
        this.likes = post.likes;
        this.views = post.views;
        this.commentsCount = post.commentsCount;
        this.sharesCount = post.sharesCount;
        this.user = post.user;
        this.community = post.community;
        this.createdAt = post.createdAt;
    };
}

export { PliziPost as default}
