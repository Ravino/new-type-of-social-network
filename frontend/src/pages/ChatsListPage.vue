<template>
    <div class="container-fluid pl-md-0 ">
        <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
            <div class="col-12 col-md-1 chat-page-height chat-page-height-aside overflow-hidden px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div v-if="isFreshUser()" class="chat-page-height chat-page-height-body col-12 col-md-11 ">
                <div class="row plz-post-item mb-4 bg-white-br20 p-4">
                    <p class="alert alert-info w-100 text-center p-5 mb-0">
                        Вы ещё ни с кем не общались, потому здесь пока никого нет.<br />
                        Находите себе новых <router-link tag="a" to="/friends" class="btn-link mx-0 px-0">друзей</router-link>,
                        вступайте в
                        <router-link tag="a" to="/popular-communities" class="btn-link mx-0 px-0"> сообщества</router-link>!
                    </p>
                </div>
            </div>

            <div v-else class="col-12 col-md-11 chat-page-height chat-page-height-body px-0 pl-md-3 ">

                <div v-if="isDialogsLoaded" id="chatMain"
                     class="d-flex flex-column flex-lg-row flex bg-white-br20 overflow-hidden in-shadow">

                    <!-- @TGA если добавить обновляемый ключ - то будет постоянная перезагрузка списка сообщений с API -->
<!--                    :key="`chatMessagesUsersList-`+ $root.$dialogsKeyUpdater"-->
                    <ChatDialogs ref="chatMessagesUsersList"
                                 v-bind:currentDialogID="currentDialogID"
                                 @SwitchToChat="onSwitchToChat"></ChatDialogs>

                    <div id="chatMessagesWrapper"
                         class="col-12 col-lg-8 bg-light d-lg-flex flex-column p-0 ">

                        <ChatHeader v-if="currentDialog" v-bind:currentDialog="currentDialog"
                                    @ChatMessagesFilter="onUpdateMessagesFilterText"
                                    ref="chatHeader">
                        </ChatHeader>

                        <div id="chatMessagesWrapperBody" class="position-relative">

                            <ChatMessages v-if="isMessagesLoaded"
                                          v-bind:messagesList="messagesList"
                                          v-bind:filter="filter"
                                          v-bind:currentDialog="currentDialog"
                                          v-bind:keyUpdater="$root.$messagesKeyUpdater"
                                          v-bind:isMessagesLazyLoad="isMessagesLazyLoad"
                                          v-bind:isCanLoadMoreMessages="isCanLoadMoreMessages"
                                          v-bind:key="getChatMessagesKey()"
                                          @ClearFilters="clearChatMessagesFilters"
                                          @ScrollToTop="onScrollToTop"
                                          @RemoveMessageInList="removeMessageInList"
                                          :style="`padding-bottom: ${changedHeight}`"
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

import ChatMixin from '../mixins/ChatMixin.js';
import NotificationMixin from '../mixins/NotificationMixin.js';

import PliziMessagesCollection from '../classes/Collection/PliziMessagesCollection.js';

export default {
name: 'ChatsListPage',
components: {
    ChatNotifications,
    ChatDialogs,
    AccountToolbarLeft,
    Spinner,
    ChatHeader, ChatMessages, ChatFooter,
},

mixins: [ChatMixin, NotificationMixin],

data() {
    return {
        componentKey: 0,
        chatCarrier   : null,
        currentDialog : null,
        messagesList  : (new PliziMessagesCollection()),
        isMessagesLoaded: false,
        isMessagesLazyLoad: false,
        isCanLoadMoreMessages: true,

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
    }
},

methods: {
    onScrollToTop(evData){
        this.lazyLoadMessages(evData.chatId, evData.offset, evData.limit);
    },

    getChatMessagesKey(){
        return `chatMessages-`+ this.$root.$messagesKeyUpdater;
    },

    isFreshUser(){
        return (this.$root.$auth.fm.size===0  &&  this.$root.$auth.dm.size===0);
    },

    onUpdateMessagesFilterText(evData){
        this.filter.text = evData.text ? evData.text.trim() : '';
        this.filter.range = evData.range && evData.range.start && evData.range.end ? evData.range : null;
        this.$forceUpdate();
    },

    onChatFooterEditorChangedHeight(evData) {
        this.changedHeight = evData.changedHeight + 'px';

        if (this.$refs &&  this.$refs.chatMessages) {
            this.$refs.chatMessages.scrollToEnd();
        }
    },

    clearChatMessagesFilters() {
        // TODO: нужна прокрутка вниз
        this.$refs.chatHeader.clearFilters();

        this.onUpdateMessagesFilterText({
            text : '',
            range: null
        });
    },

    removeMessageInList(evData) {
        /** @TGA не реагируем, если мы не на странице чата **/
        if ('ChatsListPage'!==this.$root.$router.currentRoute.name)
            return;

        if (this.currentDialog.id !== evData.chatId)
            return;

        this.$root.$messagesKeyUpdater++;

        this.messagesList.delete(evData.messageId);

        /** @var PliziMessage **/
        const lastMsg = this.messagesList.last;

        this.updateDialogsList(evData.chatId, { message: lastMsg });
        if (this.$refs &&  this.$refs.chatMessages) {
            this.$refs.chatMessages.scrollToEnd();
        }
    },

    addNewMessageNotification(message) {
        if (message.isMine || this.currentDialog.id === message.chatId) {
            return;
        }

        this.addNotification(message);
    },

    updateDialogsList(chatId, evData) {
        evData.chatId = chatId;

        this.$root.$emit('UpdateChatDialog', evData);
    },

    onSwitchToChat(evData) {
        this.chatSelect(evData.chatId);
    },

    async chatSelect(chatId) {
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        this.currentDialog = this.$root.$auth.dm.get(chatId);

        try {
            msgsResponse = await this.$root.$api.$chat.messages(chatId, 0, 10);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        window.localStorage.setItem('pliziActiveDialog', chatId);

        this.messagesList.clear();
        msgsResponse.map( (msg) => {
            this.appendMessageToMessagesList(msg);
        });

        this.isMessagesLoaded = true;
    },

    addNewChatMessageToList(evData){
        /** @TGA не реагируем, если мы не на странице чата **/
        if ('ChatsListPage'!==this.$root.$router.currentRoute.name)
            return;

        if (this.currentDialog.id === evData.chatId) {
            this.appendMessageToMessagesList(evData.message);

            if (this.$refs && this.$refs.chatMessages) {
                this.$refs.chatMessages.$forceUpdate();
                this.$refs.chatMessages.scrollToEnd();
            }
        }

        this.updateDialogsList(evData.chatId, evData);
    },

    appendMessageToMessagesList(evData){
        this.messagesList.append( evData );
        this.$root.$messagesKeyUpdater++;
    },

    addListeners(){
        this.$root.$on('newMessageInDialog', this.addNewMessageNotification);

        this.$root.$on('newMessageInDialog', this.addNewChatMessageToList);

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
