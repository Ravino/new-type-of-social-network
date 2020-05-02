const DialogMixin = {

methods: {

    /**
     * делает переход к диалогу с юзером
     * @param {string} userId -
     * @returns {null}
     */
    async openDialogWithFriend(userId){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.dialogOpen( [userId] );
        }
        catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            this.$root.$emit('NewChatDialog', apiResponse);
            window.localStorage.setItem('pliziActiveDialog', apiResponse.id);
        }

        this.$root.$router.push('/chats-list');
    },
}

};

export {DialogMixin as default}
