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

    /**
     * Друг?
     * @type {boolean}
     * @private
     */
    _isFriend = false;

    /**
     * Кол-во подписавшихся
     * @type {number}
     * @private
     */
    _followCount = 0;

    /**
     * В черном списке?
     * @type {boolean}
     * @private
     */
    _isInBlacklist = false;

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

    get isFriend() {
        return this._isFriend;
    }

    set isFriend(value) {
        this._isFriend = value;
    }

    get followCount() {
        return this._followCount;
    }

    set followCount(value) {
        this._followCount = value;
    }

    get isInBlacklist() {
        return this._isInBlacklist;
    }

    set isInBlacklist(value) {
        this._isInBlacklist = value;
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
        this.isFriend = inputData.isFriend;
        this.followCount = inputData.followCount;
        this.isInBlacklist = inputData.isInBlacklist;
    }

    toJSON(){
        return {
            notificationsCount : this.notifications,
            unreadMessagesCount : this.unreadMessages,
            pendingFriendshipRequestsCount : this.invitations,
            totalFriendsCount : this.friends,
            isFollow: this.isFollow,
            isFriend: this.isFriend,
            followCount: this.followCount,
            isInBlacklist: this.isInBlacklist,
        };
    }
}

export { PliziUserStats as default}
