const DialogMixin = {

methods: {

    /**
     * делает переход к диалогу с юзером
     * @param {number} userId -
     * @returns {null}
     */
    async openDialogWithFriend(userId){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.openChatDialog( [userId] );
        }
        catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            await this.$store.dispatch('SET_ACTIVE_DIALOG', apiResponse.id);
        }

        this.$root.$router.push('/chats-list');
    },
}

};

export {DialogMixin as default}
