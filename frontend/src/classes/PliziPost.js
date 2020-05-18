import PliziUser from './PliziUser.js';
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
     * Лайкнутый ли этот пост текущим пользователем.
     * @type {boolean}
     * @private
     */
    _alreadyLiked = false;

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
     * Автор поста.
     * @type {PliziUser|null}
     * @private
     */
    _author = null;

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

    /**
     * Пост который был переслан.
     * @type {PliziPost}
     * @private
     */
    _sharedFrom = null;

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

        if (this.author)
            return this.author.firstName + ` ` + this.author.lastName;

        return ``;
    }

    get posterPic() {
        if (this._user)
            return this.user.userPic;

        if (this._community)
            return this.community.primaryImage;

        if (this.author)
            return this.author.userPic;

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

    get alreadyLiked() {
        return this._alreadyLiked;
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

    /**
     * @returns {PliziUser}
     */
    get author() {
        return this._author;
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

    get sharedFrom() {
        return this._sharedFrom;
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

    set alreadyLiked(value) {
        this._alreadyLiked = value;
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

    set author(value) {
        this._author = value;
    }

    set createdAt(value) {
        this._createdAt = new Date(value * 1000);
    }

    set deleted(value) {
        this._deleted = Boolean(value);
    }

    set attachments(value) {
        this._attachments = value;
    }

    set sharedFrom(value) {
        this._sharedFrom = value;
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
        this.alreadyLiked = post.alreadyLiked;
        this.likes = post.likes;
        this.alreadyLiked = post.alreadyLiked;
        this.views = post.views;
        this.commentsCount = post.commentsCount;
        this.sharesCount = post.sharesCount;
        this.user = post.user ? new PliziUser(post.user) : null;
        this.community = post.community ? new PliziCommunity(post.community) : null;
        this.createdAt = post.createdAt;
        this.deleted = false;
        this.attachments = [];

        if (post.attachments && post.attachments.list && post.attachments.list.length > 0) {
            post.attachments.list.map((aItem) => {
                this.attachments.push(new PliziAttachment(aItem));
            });
        }

        this.sharedFrom = post.sharedFrom ? new PliziPost(post.sharedFrom) : null;
        this.author = post.author ? new PliziUser(post.author) : null;
    };

    /**
     * возвращает флаг - является ли поста архивным (старше 7 дней)
     * @returns {boolean}
     */
    get isArchivePost(){
        const date1 = new Date(this.createdAt * 1000);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 7;
    }

    /**
     * Возвращает флаг - принадлежит или нет пост текущему юзеру
     * @param user_id
     * @returns {boolean}
     */
    checkIsMinePost(user_id) {
        return (this.user && this.user.id) === user_id;
    }
}

export { PliziPost as default}
