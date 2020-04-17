<template>
    <div class="row "  :class="{ 'is-chatPage' : 'ChatsListPage'===this.$root.$router.currentRoute.name }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3  chat-page-height">
            <div v-if="checkIsDialogsList()" id="chatMain" class="row bg-white-br20 overflow-hidden">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">
                    <vue-custom-scrollbar class="chat-list-scroll py-4 h-100"  :settings="settings"
                                          @ps-scroll-y="scrollHanle">
                        <ul id="chatFriends" class="list-unstyled mb-0">
                            <ChatListItem v-for="(dialog, dialogIndex) in dialogsList"
                                          v-bind:currentDialog="currentDialog" v-bind:dialog="dialog"
                                          v-bind:key="dialogIndex" v-bind:dialogID="dialogIndex">
                            </ChatListItem>
                        </ul>
                    </vue-custom-scrollbar>
                </div>

                <div id="chatMessangesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0 h-100">
                    <ChatHeader v-bind:currentDialog="currentDialog"></ChatHeader>

                    <ChatMessages v-if="isMessagesLoaded" v-bind:messages="messagesList" v-bind:currentDialog="currentDialog"></ChatMessages>
                    <Spinner v-else v-bind:message="`Сообщения загружаются`"></Spinner>

                    <ChatFooter v-bind:currentDialog="currentDialog" ref="ChatFooter"></ChatFooter>
                </div>
            </div>

            <div v-else class="row bg-white-br20">
                <div v-if="isDialogsLoaded" class="col-sm-12 col-md-12 col-lg-4 col-xl-12 py-5 px-5 text-center">
                    <h3 class="text-info">Вы ещё ни с кем не общались.</h3>
                </div>
                <Spinner v-else></Spinner>
            </div>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';

import ChatListItem from '../components/ChatListItem.vue';

import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatFooter from '../components/ChatFooter.vue';
import vueCustomScrollbar from 'vue-custom-scrollbar';


export default {
name: 'ChatsListPage',
components: {
    Spinner,
    AccountToolbarLeft, ChatListItem, ChatHeader, ChatMessages, ChatFooter,
    vueCustomScrollbar
},

data() {
    return {
        chatCarrier   : null,
        dialogsList   : null,
        isDialogsLoaded: false,
        currentDialog : {},
        messagesList  : [],
        isMessagesLoaded: false,
        settings: {
            maxScrollbarLength: 60,
            useBothWheelAxes: false,
            suppressScrollX: true
        }
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


    async switchToChat(evData) {
        let messageResponse = null;
        this.isMessagesLoaded = false;

        try {
            messageResponse = await this.$root.$api.chatMessages(evData.dialogID);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        await this.$store.dispatch('SET_ACTIVE_DIALOG', evData.dialogID);

        this.messagesList = messageResponse;
        this.currentDialog = this.dialogsList.find((dialog) => dialog.id === evData.dialogID);
        this.isMessagesLoaded = true;
    },


    async loadDialogsList() {
        let response = null;

        try {
            response = await this.$root.$api.chatDialogs();
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.dialogsList = response;
        this.isDialogsLoaded = true;

        const lastDialogID = +this.$store.getters.activeDialog;
        this.currentDialog = undefined;

        if (this.checkIsDialogsList()) {
            this.currentDialog = this.dialogsList.find((dItem) => +dItem.id === lastDialogID);
        }

        if (typeof this.currentDialog === 'undefined') {
            if (this.checkIsDialogsList()) { // new user === no dialogs
                this.currentDialog = this.dialogsList[0];
                await this.$store.dispatch('SET_ACTIVE_DIALOG', this.currentDialog.id);
            }
        }

        return true;
    },


    /**
     *  для кратости записи
     * @returns {boolean} - true если dialogsList определён и массив
     */
    checkIsDialogsList(){
        return (typeof this.dialogsList!='undefined'  &&  Array.isArray(this.dialogsList)  &&  this.dialogsList  &&  this.dialogsList.length>0);
    },

},


async mounted() {
    const isDialogsLoaded = await this.loadDialogsList();

    this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('addNewChatMessageToList', (evData) => {
        this.addMessageToMessageList(evData);
        this.updateDialogsList(evData, 'mine');
    });

    this.connectToChatChannel();

    if (isDialogsLoaded) {
        if (Array.isArray(this.dialogsList) && this.dialogsList  &&  this.currentDialog) {
            await this.switchToChat( { dialogID : this.currentDialog.id })
        }
    }

},

}



</script>

