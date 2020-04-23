import PliziNotificationSender from './PliziNotificationSender.js';

class PliziNotificationData {
    /**
     * текст нотификации (точнее шаблон для формирования сообщения)
     * @type {string}
     * @private
     */
    _body = ``;

    /**
     * @type {PliziNotificationSender|null}
     * @private
     */
    _sender = null;

    /**
     * тип нотификации
     * @type {string|null}
     * @private
     */
    _type = null;

    /**
     * @deprecated
     * @type {string[]}
     * @private
     */
    _types = [
        `friendships.sent`,
        `community.post.created`,
        `user.post.created`,
        `user.profile.image.updated`
    ];

    constructor(notifData){
        this._body = notifData.body || ``;
        this._sender = (notifData.sender) ? (new PliziNotificationSender(notifData.sender)) : null;
        this._type = notifData.type || '';
    }

    get body() {
        return this._body;
    }

    get sender(){
        return this._sender;
    }

    get type(){
        return this._type;
    }

    get typeFriendshipsSent() {
        return 'friendships.sent';
    }

    get typeCommunityPostCreated() {
        return 'community.post.created';
    }

    get typeUserPostCreated() {
        return 'user.post.created';
    }

    get message(){
        if ('friendships.sent' === this.type) {
            switch (this.sender.sex){
                case 'f': return `${this.sender.fullName} хочет с Вам подружиться`;
                case 'm': return `${this.sender.fullName} хочет с Вам подружиться`;
                case 'n': return `Пользователь ${this.sender.fullName} хочет с Вам подружиться`;
            }
        }

        if ('community.post.created' === this.type) {
            return `В сообществе ${this.sender.fullName} что-то опубликовано`;
        }

        if ('user.post.created' === this.type) {
            switch (this.sender.sex){
                case 'f': return `Ваш друг ${this.sender.fullName} опубликовала новость`;
                case 'm': return `Ваш друг ${this.sender.fullName} опубликовал новость`;
                case 'n': return `Ваш друг пользователь ${this.sender.fullName} опубликовал новость`;
            }
        }
    }

    toJSON(){
        return {
            body : this.body,
            sender : (this._sender) ? this._sender.toJSON() : null,
            type : this.type
        }
    }
}

export { PliziNotificationData as default}
