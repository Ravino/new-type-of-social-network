<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-10">
            <ChatMainComponent
                v-bind:dialogs="dialogsList"
                v-bind:messages="messagesList"
                v-bind:currentDialog="currentDialog"></ChatMainComponent>
        </div>

        <div class="col-sm-1 col-md-2 col-lg-2 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';

import ChatMainComponent from '../components/ChatMainComponent.vue';

import { HTTPer } from '../httper/httper';

export default {
name: 'ChatsListPage',
components: {
    AccountToolbarLeft, AccountToolbarRight, ChatMainComponent
},

data() {
    return {
        chatCarrier   : null,
        dialogsList   : [],
        currentDialog : {},
        messagesList  : [],
    }
},

methods: {
    connectToChatChannel(){
        const channelOptions = {
            maxRetries: 10,
            retryDelay: 4000,
            skipSubprotocolCheck: true
        };

        this.chatCarrier = new ab.connect(window.wsUrl, s => {
            s.subscribe(this.$store.getters.chatChannel, (topic, data) => {
                if (this.currentDialog.id === data.data.chatId) {
                    this.messagesList.push(data.data)
                }
            })
        },
            (code, reason, detail) => { window.console.log(reason); },
            channelOptions
        );
    },


    async switchToChat(evData) {
        let messageResponse = await HTTPer.get('api/chat/messages/' + evData.dialogID, this.$store.getters.getHTTPConfig);
        this.messagesList = messageResponse.data;
        this.currentDialog = this.dialogsList.find((dialog) => dialog.id === evData.dialogID);
    },

    async addNewChatMessage(evData) {
        await HTTPer.post('api/chat/send', {
            body: evData.body,
            chat_id: this.currentDialog.id
        }, this.$store.getters.getHTTPConfig);

        this.messagesList.push(evData);
    },


    async loadDialogsList() {
        const response = await HTTPer.get('api/chat/dialogs', this.$store.getters.getHTTPConfig);
        this.dialogsList = response.data;

        this.currentDialog = null;
        if (Array.isArray(this.dialogsList) && this.dialogsList) {
            this.currentDialog = this.dialogsList[0];
        }

        return true;
    },

    async loadMessagesList(dialogID) {
        let messageResponse = await HTTPer.get('api/chat/messages/' + dialogID, this.$store.getters.getHTTPConfig);
        this.messagesList = messageResponse.data;
        return true;
    }
},

async mounted() {
    const isDialogsLoaded = await this.loadDialogsList();

    let messagesIsLoaded = false;

    if (isDialogsLoaded) {
        if (Array.isArray(this.dialogsList) && this.dialogsList  &&  this.currentDialog) {
            messagesIsLoaded = this.loadMessagesList(this.currentDialog.id);
        }
    }

    this.$root.$on('addNewChatMessage', this.addNewChatMessage);
    this.$root.$on('switchToChat', this.switchToChat);

    this.connectToChatChannel();
},

}
</script>

<style lang="scss" src="../styles/ChatsListPage.scss"></style>
