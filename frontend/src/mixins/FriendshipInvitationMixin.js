const FriendshipInvitationMixin = {

methods: {
    async sendFriendshipInvitation(id, fullName) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$friend.sendFriendshipInvitation(id);
        } catch (e) {
            window.console.warn(e.detailMessage);
            return;
        }

        if (apiResponse !== null) {
            if (apiResponse.status === 200) {
                this.$alert(`<h6>Приглашение дружить</h6>
<div class="alert alert-info">
Приглашение дружбы для <b class="friend-name">${fullName}</b> отправлено!
</div>`, `bg-success`, 10);
            }

            if (apiResponse.status === 422) {
                this.$alert(`<h6>Приглашение дружить</h6>
<div class="alert alert-info">${apiResponse.message}.</div>`, `bg-info`, 10);
            }
        }
    },

    async stopFriendship(friendId){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$friend.friendshipStop( friendId );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        this.isPrepareToRemoved = true;

        if ( apiResponse ) {
            this.isRemoved = true;

            this.$root.$auth.fm.removeFromFavorites(friendId);
            this.$root.$auth.frm.stopFriendship(friendId);

            this.$root.$friendsKeyUpdater++;
            this.$root.$favoritesKeyUpdater++;

            this.$emit( 'FriendshipStop', {
                friendId: friendId
            });
        }
    }
}

};

export {FriendshipInvitationMixin as default}
