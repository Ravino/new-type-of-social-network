class PliziUserStats {

    /**
     * количество нотификаций (непросмотренных)
     * @type {number}
     * @private
     */
    _notifications = 0;

    /**
     * количество непрочитанных сообщений
     * @type {number}
     * @private
     */
    _unreadMessages = 0;

    /**
     * количество инвайтов на дружбу
     * @type {number}
     * @private
     */
    _invitations = 0;

    /**
     * друзей всего
     * @type {number}
     * @private
     */
    _friends = 0;

    /**
     * В подписчиках ли пользователь
     * @type {boolean}
     * @private
     */
    _isFollow = true;

    get notifications(){
        return this._notifications;
    }

    get unreadMessages(){
        return this._unreadMessages;
    }

    get invitations(){
        return this._invitations;
    }

    get friends(){
        return this._friends;
    }

    get totalFriendsCount(){
        return this._friends;
    }

    set notifications( value ){
        this._notifications = value;
    }

    set unreadMessages( value ){
        this._unreadMessages = value;
    }

    set invitations( value ){
        this._invitations = value;
    }

    set friends( value ){
        this._friends = value;
    }

    get isFollow() {
        return this._isFollow;
    }

    set isFollow(value) {
        this._isFollow = value;
    }

    constructor(inputData){
        if (inputData) {
            this.update(inputData);
        }
    }

    update(inputData){
        this.notifications = inputData.notificationsCount;
        this.unreadMessages = inputData.unreadMessagesCount;
        this.invitations = inputData.pendingFriendshipRequestsCount;
        this.friends = inputData.totalFriendsCount;
        this.isFollow = inputData.isFollow;
    }

    toJSON(){
        return {
            notificationsCount : this.notifications,
            unreadMessagesCount : this.unreadMessages,
            pendingFriendshipRequestsCount : this.invitations,
            totalFriendsCount : this.friends,
            isFollow: this.isFollow,
        };
    }
}

export { PliziUserStats as default}
