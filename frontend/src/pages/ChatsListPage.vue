<template>
    <div class="container-fluid pl-md-0">
        <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
            <div class="col-12 col-md-1 chat-page-height overflow-hidden">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div v-if="isFreshUser" class="col-12 col-md-11 pr-0  chat-page-height">
                <div class="jumbotron">
                    <p class="alert alert-info w-100 text-center p-5">
                        Вы ещё ни с кем не общались, потому здесь пока никого нет.<br />
                        Находите себе новых
                        <router-link tag="a" to="/friends" class="btn btn-link mx-0 px-0">друзей</router-link>,
                        вступайте в <router-link tag="a" to="/popular-communities" class="btn btn-link mx-0 px-0">
                        сообщества</router-link>!
                    </p>
                </div>
            </div>
            <div v-else class="col-12 col-md-11 pr-0 mb-4 mb-md-0 chat-page-height">
                <div v-if="isDialogsLoaded" id="chatMain"
                     class="d-flex flex-column flex-lg-row flex bg-white-br20 overflow-hidden">

                    <ChatDialogs ref="chatMessagesUsersList"
                                 :currentDialogID="currentDialogID"
                                 @SwitchToChat="onSwitchToChat"></ChatDialogs>

                    <div id="chatMessagesWrapper"
                         class="col-12 col-lg-8 bg-light d-lg-flex flex-column p-0 ">

                        <ChatHeader v-if="currentDialog" v-bind:currentDialog="currentDialog"
                                    @ChatMessagesFilter="onUpdateMessagesFilterText"
                                    ref="chatHeader">
                        </ChatHeader>

                        <div id="chatMessagesWrapperBody" class="position-relative">

                            <ChatMessages v-if="isMessagesLoaded" v-bind:messagesList="messagesList"
                                          v-bind:filter="filter"
                                          v-bind:currentDialog="currentDialog"
                                          :style="`padding-bottom: ${changedHeight}`"
                                          @clearFilters="clearChatMessagesFilters"
                                          ref="chatMessages">
                            </ChatMessages>
                            <Spinner v-else
                                     v-bind:message="`Сообщения загружаются,<br />можно выбрать другой диалог`">
                                </Spinner>

                            <ChatFooter v-if="currentDialog"
                                        v-bind:currentDialog="currentDialog"
                                        @chatFooterEditorChangedHeight="onChatFooterEditorChangedHeight"
                                        :style="`height: ${changedHeight}`"
                                        ref="ChatFooter"></ChatFooter>
                        </div>
                    </div>
                </div>

                <div v-else class="row bg-white-br20">
                    <div v-if="isDialogsLoaded" class="col-12  col-lg-4 py-5 px-5 text-center">
                        <h3 class="text-info">Вы ещё ни с кем не общались.</h3>
                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>

            <ChatNotifications :notifications="notifications"
                               @removeNotification="removeNotification"></ChatNotifications>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';

import ChatDialogs from '../common/Chat/ChatDialogs.vue';
import ChatHeader from '../common/Chat/ChatHeader.vue';
import ChatMessages from '../common/Chat/ChatMessages.vue';
import ChatFooter from '../common/Chat/ChatFooter.vue';

import ChatNotifications from '../common/Chat/ChatNotifications.vue';

import PliziDialog from '../classes/PliziDialog.js';
import PliziMessage from '../classes/PliziMessage.js';
import NotificationMixin from '../mixins/NotificationMixin.js';

export default {
name: 'ChatsListPage',
components: {
    ChatNotifications,
    ChatDialogs,
    AccountToolbarLeft,
    Spinner,
    ChatHeader, ChatMessages, ChatFooter,
},

mixins: [NotificationMixin],

data() {
    return {
        componentKey: 0,
        chatCarrier   : null,
        currentDialog : null,
        messagesList  : [],
        isMessagesLoaded: false,

        filter : {
            text: '',
            range: null,
        },

        dialogsSearchedList: null,
        changedHeight: '',
    }
},

computed: {
    currentDialogID(){
        return (this.currentDialog) ? this.currentDialog.id : 'unknown';
    },

    isDialogsLoaded(){
        return this.$root.$auth.dm.isLoad;
    },

    isFreshUser(){
        return (this.$root.$auth.fm.size===0  &&  this.$root.$auth.dm.size===0);
    }
},

methods: {
    onUpdateMessagesFilterText(evData){
        this.filter.text = evData.text ? evData.text.trim() : '';
        this.filter.range = evData.range && evData.range.start && evData.range.end ? evData.range : null;
        this.$forceUpdate();
    },

    onChatFooterEditorChangedHeight(evData) {
        this.changedHeight = evData.changedHeight + 'px';
        this.$refs.chatMessages.scrollToEnd();
    },

    clearChatMessagesFilters() {
        // TODO: нужна прокрутка вниз
        this.$refs.chatHeader.clearFilters();

        this.onUpdateMessagesFilterText({
            text : '',
            range: null
        });
    },

    removeMessageInList(evData){
        /** @TGA не реагируем, если мы не на странице чата **/
        if ('ChatsListPage'!==this.$root.$router.currentRoute.name)
            return;

        if (this.currentDialog.id !== evData.chatId)
            return;

        this.messagesList = this.messagesList.filter( mItem => evData.messageId !== mItem.id );

        /** @var PliziMessage **/
        const lastMsg = this.messagesList[this.messagesList.length - 1];

        this.updateDialogsList(evData.chatId, { message: lastMsg });
    },

    addNewChatMessageToList(evData){
        /** @TGA не реагируем, если мы не на странице чата **/
        if ('ChatsListPage'!==this.$root.$router.currentRoute.name)
            return;

        if (this.currentDialog.id === evData.chatId) {
            this.addMessageToMessagesList(evData.message);
        }

        this.updateDialogsList(evData.chatId, evData);
    },

    addNewMessageNotification(message) {
        if (message.isMine || this.currentDialog.id === message.chatId) {
            return;
        }

        this.addNotification(message);
    },

    updateDialogsList(chatId, evData){
        evData.chatId = chatId;

        this.$root.$emit('UpdateChatDialog', evData);
    },

    addMessageToMessagesList(evData){
        this.messagesList.push( new PliziMessage(evData) );
    },

    onSwitchToChat(evData) {
        this.chatSelect(evData.chatId);
    },

    async chatSelect(chatId){
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        this.currentDialog = this.$root.$auth.dm.get(chatId);

        try {
            msgsResponse = await this.$root.$api.$chat.messages(chatId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        window.localStorage.setItem('pliziActiveDialog', chatId);

        this.messagesList = [];
        msgsResponse.map( (msg) => {
            this.addMessageToMessagesList(msg);
        });

        this.isMessagesLoaded = true;
    },

    addListeners(){
        this.$root.$on('newMessageInDialog', this.addNewChatMessageToList);
        this.$root.$on('newMessageInDialog', this.addNewMessageNotification);

        this.$root.$on('removeMessageInDialog', (evData)=>{
            if (this.removeMessageInList) {
                this.removeMessageInList(evData);
            }
        });
    }
},

created(){
    this.addListeners();
},

}
</script>
