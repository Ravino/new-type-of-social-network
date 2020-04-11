<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3">
            <div v-if="(dialogsList.length > 0)" id="chatMain" class="row bg-white-br20 overflow-hidden">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 py-4 border-right">
                    <ul id="chatFriends" class="list-unstyled mb-0">
                        <ChatListItem v-for="(dialog, dialogIndex) in dialogsList"
                                      v-bind:currentDialog="currentDialog" v-bind:dialog="dialog"
                                      v-bind:key="dialogIndex" v-bind:dialogID="dialogIndex">
                        </ChatListItem>
                    </ul>
                </div>

                <div id="chatMessangesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0">
                    <ChatHeader v-bind:currentDialog="currentDialog"></ChatHeader>
                    <ChatMessages v-bind:messages="messagesList" v-bind:currentDialog="currentDialog"></ChatMessages>
                    <ChatFooter v-bind:currentDialog="currentDialog"></ChatFooter>
                </div>
            </div>
            <div v-else class="row bg-white-br20">
                <div v-if="isDialogsLoaded" class="col-sm-12 col-md-12 col-lg-4 col-xl-12 py-5 px-5 text-center">
                    <h3 class="text-info">Вы ещё ни с кем не общались.</h3>
                </div>
                <div v-else class="col-sm-12 col-md-12 col-lg-4 col-xl-12 py-5 px-5 d-flex flex-row">
                    <div class="w-50 text-right pr-3">
                        <i class="fas fa-spinner fa-3x fa-spin text-info"></i>
                    </div>
                    <div class="w-50 pt-1 text-info">
                        <h3>Данные загружаются...</h3>
                    </div>
                </div>
            </div>
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
        isDialogsLoaded: false
    }
},

methods: {
    connectToChatChannel(){
        const channelOptions = {
            maxRetries: 10,
            retryDelay: 4000,
            skipSubprotocolCheck: true
        };

        this.chatCarrier = new ab.connect(window.wsUrl,
            this.channelSubscribe,
            (code, reason, detail) => { window.console.warn(reason); },
            channelOptions
        );
    },


    channelSubscribe(s) {
        s.subscribe(this.$store.getters.chatChannel, (topicID, data) => {
            if (this.currentDialog.id === data.data.chatId) {
                this.addMessageToMessageList(data.data);
                this.updateDialogsList(data.data, 'other')
            }
        });
    },


    addMessageToMessageList(evData){
        this.messagesList.push(evData);
    },


    updateDialogsList(evData, wMode){
        // @TGA .find не срабатывает :(
        // let luDialog = this.dialogsList.find( (dItem) => { dItem.id === this.currentDialog.id } );

        let luDialog = null;

        this.dialogsList.map( (dItem) => {
            if (+dItem.id === this.currentDialog.id) {
                luDialog = dItem;
            }
        });

        if ( luDialog ) {
            luDialog.lastMessageDT = evData.createdAt;
            luDialog.lastMessageText = evData.body;
            luDialog.isLastFromMe = (`mine` === wMode);
            luDialog.isRead = (`mine` === wMode);
        }
    },


    switchToChat(evData) {
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


    async loadDialogsList() {
        const response = await HTTPer.get('api/chat/dialogs', this.$store.getters.getHTTPConfig);
        this.dialogsList = response.data;

        const lastDialogID = +this.$store.getters.activeDialog;
        this.currentDialog = undefined;

        if (Array.isArray(this.dialogsList)  &&  this.dialogsList  &&  this.dialogsList.length>0) {
            this.currentDialog = this.dialogsList.find((dItem) => +dItem.id === lastDialogID);
        }

        if (typeof this.currentDialog === 'undefined') {
            if (this.dialogsList.length > 0) { // new user === no dialogs
                this.currentDialog = this.dialogsList[0];
                this.$store.dispatch('SET_ACTIVE_DIALOG', this.currentDialog.id);
            }
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
    this.isDialogsLoaded = true;

    let messagesIsLoaded = false;

    if (isDialogsLoaded) {
        if (Array.isArray(this.dialogsList) && this.dialogsList  &&  this.currentDialog) {
            messagesIsLoaded = this.loadMessagesList(this.currentDialog.id);
        }
    }

    this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('addNewChatMessageToList', (evData)=>{
        this.addMessageToMessageList(evData);
        this.updateDialogsList(evData, 'mine');
    });

    this.connectToChatChannel();
},

}
</script>
