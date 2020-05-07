<template>
    <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden pl-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div v-if="isFreshUser" class="col-sm-12 col-md-9 col-lg-11 pr-3 chat-page-height">
            <div class="jumbotron">
                <p class="alert alert-info w-100 text-center p-5">
                    Вы ещё ни с кем не общались, потому здесь пока никого нет.<br />
                    Находите себе новых <router-link tag="a" to="/friends" class="btn btn-link mx-0 px-0">друзей</router-link>, вступайте в <router-link tag="a" to="/popular-communities" class="btn btn-link mx-0 px-0">сообщества</router-link>!
                </p>
            </div>
        </div>
        <div v-else class="col-sm-12 col-md-9 col-lg-11 pr-3 chat-page-height">
            <div v-if="isDialogsLoaded" id="chatMain" class="row bg-white-br20 overflow-hidden">

                <ChatDialogs ref="chatMessagesUsersList"
                             :currentDialogID="currentDialogID"
                             @SwitchToChat="onSwitchToChat">
                </ChatDialogs>

                <div id="chatMessagesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0 h-100">

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
                        <Spinner v-else v-bind:message="`Сообщения загружаются,<br />можно выбрать другой диалог`"></Spinner>

                        <ChatFooter v-if="currentDialog"
                                    v-bind:currentDialog="currentDialog"
                                    @chatFooterEditorChangedHeight="onChatFooterEditorChangedHeight"
                                    :style="`height: ${changedHeight}`"
                                    ref="ChatFooter"></ChatFooter>
                    </div>
                </div>
            </div>

            <div v-else class="row bg-white-br20">
                <div v-if="isDialogsLoaded" class="col-sm-12 col-md-12 col-lg-4 col-xl-12 py-5 px-5 text-center">
                    <h3 class="text-info">Вы ещё ни с кем не общались.</h3>
                </div>
                <Spinner v-else></Spinner>
            </div>
        </div>

        <div id="plzNotification">
            <div class="plz-notification d-flex justify-content-between align-items-start p-4 ">
                <div class="plz-notification-pic mr-3">
                    <img src="images/maria.png" alt="image">
                </div>
                <div class="plz-notification-body mr-3">
                    <h6 class="plz-notification-name mb-2">Александр Лебовски</h6>
                    <div class="plz-notification-text">
                        <p>Где мои деньги?</p>
                        <p>А это второе предложение</p>
                        <p>А это длинные слова предложениепредложениепре sdscdsdsdsdsdsффффффффффффффффsdscdsdsdsdsds</p>
                        <p>Непрерывное слово таааааааааffffssssssdsadsdasdadadasdasdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaasdasdasdffааааааааааааакккоое</p>
                    </div>
                </div>
                <button class="btn btn-close pt-0 pr-0">
                    <i class="icon icon-close-notification"></i>
                </button>
            </div>
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

import PliziDialog from '../classes/PliziDialog.js';
import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatsListPage',
components: {
    ChatDialogs,
    AccountToolbarLeft,
    Spinner,
    ChatHeader, ChatMessages, ChatFooter,
},

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

        this.addMessageToMessagesList(evData.message);
        this.updateDialogsList(evData.chatId, evData);
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
        this.$root.$on('removeMessageInDialog', this.removeMessageInList);
    }
},

created(){
    this.addListeners();
},

}
</script>
