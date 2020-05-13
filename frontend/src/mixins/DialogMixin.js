import PliziFriend from '../classes/PliziFriend.js';

const DialogMixin = {

methods: {

    /**
     * делает переход к диалогу с юзером
     * @param {PliziFriend} user -
     * @returns
     */
    async openDialogWithFriend(user){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.dialogOpen( user.fullName,[user.id] );
        }
        catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            this.$root.$emit('NewChatDialog', apiResponse);
            window.localStorage.setItem('pliziActiveDialog', apiResponse.id);
        }
    },
}

};

export {DialogMixin as default}
