import PliziNotificationSender from './PliziNotificationSender.js';

class PliziNotificationData {
    /**
     * текст нотификации (точнее шаблон для формирования сообщения)
     * @type {string}
     * @private
     */
    _body = ``;

    /**
     * @type {PliziNotificationSender}
     * @private
     */
    _sender = null;

    /**
     * тип нотификации
     * @type {string}
     * @private
     */
    _notificationType = null;

    /**
     * @deprecated
     * @type {string[]}
     * @private
     */
    _types = [
        `friendships.sent`,
        `friendships.accepted`,
        `friendships.denied`,
        `community.post.created`,
        `user.post.created`,
        `user.profile.image.updated`
    ];

    constructor(notifData){
        this._body = notifData.body;
        this._sender = new PliziNotificationSender(notifData.sender);
        this._notificationType = notifData.notificationType;
    }

    get body() {
        return this._body;
    }

    get sender(){
        return this._sender;
    }

    get notificationType(){
        return this._notificationType;
    }

    get message(){
        if ('friendships.sent' === this.notificationType) {
            switch (this.sender.sex){
                case 'f': return `${this.sender.fullName} хочет с Вам подружиться`;
                case 'm': return `${this.sender.fullName} хочет с Вам подружиться`;
                case 'n': return `Пользователь ${this.sender.fullName} хочет с Вам подружиться`;
            }
        }

        if ('friendships.accepted' === this.notificationType) {
            switch (this.sender.sex){
                case 'f': return `${this.sender.fullName} одобрила Ваш запрос на дружбу`;
                case 'm': return `${this.sender.fullName} одобрил Ваш запрос на дружбу`;
                case 'n': return `Пользователь ${this.sender.fullName} одобрил Ваш запрос на дружбу`;
            }
        }

        if ('friendships.denied' === this.notificationType) {
            switch (this.sender.sex){
                case 'f': return `${this.sender.fullName} отказалась дружить с Вами`;
                case 'm': return `${this.sender.fullName} отказался дружить с Вами`;
                case 'n': return `Пользователь ${this.sender.fullName} отклонил Вашу дружбу`;
            }
        }

        if ('community.post.created' === this.notificationType) {
            return `В сообществе ${this.sender.fullName} что-то опубликовано`;
        }

        if ('user.post.created' === this.notificationType) {
            switch (this.sender.sex){
                case 'f': return `Ваш друг ${this.sender.fullName} опубликовала новость`;
                case 'm': return `Ваш друг ${this.sender.fullName} опубликовал новость`;
                case 'n': return `Ваш друг пользователь ${this.sender.fullName} опубликовал новость`;
            }
        }

        if ('user.profile.image.updated' === this.notificationType) {
            switch (this.sender.sex){
                case 'f': return `Ваш друг ${this.sender.fullName} обновила фото своего профиля`;
                case 'm': return `Ваш друг ${this.sender.fullName} обновил фото своего профиля`;
                case 'n': return `Ваш друг пользователь ${this.sender.fullName} обновил фото своего профиля`;
            }
        }
    }

    toJSON(){
        return {
            body : this.body,
            sender : (this._sender) ? this._sender.toJSON() : null,
            notificationType : this.notificationType
        }
    }
}

export { PliziNotificationData as default}
