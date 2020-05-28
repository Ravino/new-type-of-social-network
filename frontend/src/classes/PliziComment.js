import PliziUser from './PliziUser.js';
import PliziAttachment from "./PliziAttachment";

class PliziComment {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = `/images/noavatar-256.png`;

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
     * кол-во лайков
     * @type {null}
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
     * @type {Array}
     * @private
     */
    _usersLikes = [];

    /**
     * автор-юзер
     * @type {PliziUser|null}
     * @private
     */
    _user = null;

    /**
     * Автор комента.
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

    get id() {
        return this._id;
    }

    get name() {
        return this._name
    }

    get body() {
        return this._body;
    }

    get likes() {
        return this._likes;
    }

    get alreadyLiked() {
        return this._alreadyLiked;
    }

    get usersLikes() {
        return this._usersLikes;
    }

    /**
     * @returns {PliziUser}
     */
    get user() {
        return this._user;
    }

    /**
     * @returns {PliziUser}
     */
    get author() {
        return this._author;
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

    set likes(value) {
        this._likes = value;
    }

    set alreadyLiked(value) {
        this._alreadyLiked = value;
    }

    set usersLikes(value) {
        this._usersLikes = value;
    }

    set user(value) {
        this._user = value;
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

    /**
     * @param {object} comment
     */
    constructor(comment) {
        this.update(comment);
    }

    /**
     * Обновление комментариев
     * @param {Object} comment
     */
    update(comment) {
        this.body = comment.body;
        this.name = comment.name;
        this.id = comment.id;
        this.likes = comment.likes;
        this.author = comment.author;
        this.alreadyLiked = comment.alreadyLiked;
        this.usersLikes = comment.usersLikes ? post.usersLikes.list.map((user) => {
            return new PliziUser(user);
        }) : [];
        this.createdAt = comment.createdAt;
        this.user = comment.user ? new PliziUser(comment.user) : null;
        this.attachments = [];
        this.deleted = false;

        if (comment.attachments && comment.attachments.list && comment.attachments.list.length > 0) {
            comment.attachments.list.map((aItem) => {
                this.attachments.push(new PliziAttachment(aItem));
            });
        }

        this.author = comment.author ? new PliziUser(comment.author) : null;
    };
}

export { PliziComment as default }
