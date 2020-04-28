import PliziUzer from './PliziUser.js';
import PliziCommunity from './PliziCommunity.js';
import PliziAttachment from "./PliziAttachment";

class PliziPost {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

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
    _body = null;

    /**
     * @type {string[]}
     * @private
     */
    _primaryImage = null;

    /**
     * кол-во лайков
     * @type {number}
     * @private
     */
    _likes = null;

    /**
     * кол-во просмотров
     * @type {number}
     * @private
     */
    _views = null;

    /**
     * кол-во комментариев
     * @type {number}
     * @private
     */
    _commentsCount = null;

    /**
     * кол-во репостов
     * @type {number}
     * @private
     */
    _sharesCount = null;

    /**
     * автор-юзер
     * @type {PliziUzer|null}
     * @private
     */
    _user = null;

    /**
     * автор-сообщество
     * @type {PliziCommunity|null}
     * @private
     */
    _community = null;

    /**
     * @type {Date}
     * @private
     */
    _createdAt = null;

    /**
     * Запись удалена, но только для отображения.
     * @type {boolean}
     * @private
     */
    _deleted = false;

    /**
     * объект с аттачментами
     * @type {object[]}
     * @private
     */
    _attachments = null;

    get id() {
        return this._id;
    }

    get name() {
        return this._name
    }

    get posterName() {
        if (this._user)
            return this._user.firstName + ` ` + this._user.lastName;

        if (this._community)
            return this._community.name;

        return ``;
    }

    get posterPic() {
        if (this._user)
            return this.user.userPic;

        if (this._community)
            return this.community.primaryImage;

        return this.__defaultAvatarPath;
    }

    get body() {
        return this._body;
    }

    get primaryImage() {
        return this._primaryImage;
    }

    get images() {
        return this._primaryImage;
    }

    get isImages() {
        return (this._primaryImage  &&  this._primaryImage.length>0);
    }

    get likes() {
        return this._likes;
    }

    get views() {
        return this._views
    }

    /**
     * @returns {PliziUzer}
     */
    get user() {
        return this._user;
    }

    /**
     * @returns {PliziCommunity}
     */
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

    get deleted() {
        return this._deleted;
    }

    get attachments(){
        return this._attachments;
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
        this._createdAt = new Date(value);
    }

    set deleted(value) {
        this._deleted = Boolean(value);
    }

    set attachments(value) {
        this._attachments = value;
    }

    /**
     * @param {object} post
     */
    constructor(post) {
        this.update(post);
    }

    /**
     * Обновление поста
     * @param {object} post
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
        this.user = post.user? new PliziUzer(post.user) : null;
        this.community = post.community ? new PliziCommunity(post.community) : null;
        this.createdAt = post.createdAt;
        this.deleted = false;
        this.attachments = [];

        if (post.attachments && post.attachments.list && post.attachments.list.length > 0) {
            post.attachments.list.map((aItem) => {
                this.attachments.push(new PliziAttachment(aItem));
            });
        }
    };

    /**
     * возвращает флаг - принадлежит или нет пост текущему юзеру
     * TODO: @TGA - переделать потом на реальные данные
     * @returns {boolean}
     */
    get isMinePost(){
        return true;
    }

    /**
     * возвращает флаг - является ли поста архивным (старше 7 дней)
     * @returns {boolean}
     */
    get isArchivePost(){
        const pDate = this.createdAt.getTime() / 1000;
        const nDate = (new Date()).getTime() / 1000;

        const diff = Math.ceil( (nDate - pDate)/ 86400 );

        return (diff > 7);
    }
}

export { PliziPost as default}
