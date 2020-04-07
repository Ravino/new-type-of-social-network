<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-10">
            <div id="chatMain" class="row bg-light border">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto pl-lg-0 pl-xl-0 px-sm-0 px-md-0">
                    <ul id="chatFriends" class="list-unstyled mb-0">
                        <ChatListItem v-for="(dialog, dialogIndex) in dialogsList"
                                      v-bind:currentDialog="currentDialog" v-bind:dialog="dialog"
                                      v-bind:key="dialogIndex" v-bind:dialogID="dialogIndex">
                        </ChatListItem>
                    </ul>
                </div>

                <div id="chatMessangesWrapper" class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-block d-xl-block h-100">
                    <ChatHeader v-bind:currentDialog="currentDialog"></ChatHeader>
                    <ChatMessages v-bind:messages="messagesList" v-bind:currentDialog="currentDialog"></ChatMessages>
                    <ChatFooter v-bind:currentDialog="currentDialog"></ChatFooter>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-2 col-lg-2 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';

import ChatListItem from '../components/ChatListItem.vue';

import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatFooter from '../components/ChatFooter.vue';

import { HTTPer } from '../httper/httper';

export default {
name: 'ChatsListPage',
components: {
    AccountToolbarLeft, AccountToolbarRight,
    ChatListItem, ChatHeader, ChatMessages, ChatFooter
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

        this.chatCarrier = new ab.connect('ws://'+window.wsUrl+'/pubsub',
            this.channelSubscribe,
            (code, reason, detail) => { window.console.warn(reason); },
            channelOptions
        );
    },


    channelSubscribe(s){
        let cid = this.$store.getters.chatChannel;

        s.subscribe(cid, (topicID, data) => {
            // window.console.log(JSON.parse(JSON.stringify(data.data)), `data.data`);

            if (this.currentDialog.id === data.data.chatId) {
                this.addMessageToMessageList(data.data)
            }
        });
    },


    switchToChat(evData) {
        window.console.warn('Switch to chat: '+evData.dialogID);

        HTTPer.get('api/chat/messages/' + evData.dialogID, this.$store.getters.getHTTPConfig)
            .then((response) => {
                this.$store.dispatch('SET_ACTIVE_DIALOG', evData.dialogID);

                this.messagesList = response.data;
                this.currentDialog = this.dialogsList.find((dialog) => dialog.id === evData.dialogID);
            })
            .catch((error) => {
                window.console.warn(error.response.status+': '+error.response.statusText+': ' +error.response.data.message);
            });
    },


    addMessageToMessageList(evData){
        this.messagesList.push(evData);
    },


    async loadDialogsList() {
        const response = await HTTPer.get('api/chat/dialogs', this.$store.getters.getHTTPConfig);
        this.dialogsList = response.data;

        const lastDialog = +this.$store.getters.activeDialog;

        this.currentDialog = null;

        if (Array.isArray(this.dialogsList)  &&  this.dialogsList  &&  this.dialogsList.length>0) {
            this.dialogsList.map((dItem)=>{
                if (+dItem.id === lastDialog){
                    this.currentDialog = JSON.parse(JSON.stringify(dItem));
                }
            });
        }

        if (this.currentDialog === null) {
            this.currentDialog = this.dialogsList[0];
            this.$store.dispatch('SET_ACTIVE_DIALOG', this.currentDialog.id);
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

    this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('addNewChatMessageToList', this.addMessageToMessageList);

    this.connectToChatChannel();
},

}
</script>
