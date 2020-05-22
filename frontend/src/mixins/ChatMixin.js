const ChatMixin = {
data() {
    return {
        isMessagesLazyLoad: false,
    }
},

methods: {
    killBrTrail(sText){
        const brExample = `<br/>`;

        while (true){
            const pos = sText.length - brExample.length;
            const trail = sText.substr(pos).toLowerCase();

            if (trail === brExample) {
                sText = sText.substr(0, pos);
            }
            else {
                break;
            }
        }

        return sText;
    },

    async lazyLoadMessages(chatId, offset, limit){
        let msgsResponse = null;

        this.isMessagesLazyLoad = true;

        try {
            msgsResponse = await this.$root.$api.$chat.messages(chatId, offset, limit);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        window.localStorage.setItem('pliziActiveDialog', chatId);

        msgsResponse.map( (msg) => {
            this.addMessageToMessagesList(msg);
        });

        this.isMessagesLazyLoad = true;
    },
},

computed : {

}
};

export {ChatMixin as default}
