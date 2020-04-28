<template>
    <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden pl-0">
            <AccountToolbarRight></AccountToolbarRight>
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3  chat-page-height">
            <div v-if="checkIsDialogsList()" id="chatMain" class="row bg-white-br20 overflow-hidden">

                <div id="chatMessagesUsersList" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">
                    <ChatDialogsFilter @ChatDialogsFilter="onUpdateDialogsFilterText"></ChatDialogsFilter>

                    <vue-custom-scrollbar class="chat-list-scroll pb-0 pb-4"
                                          :settings="customScrollBarSettings">
                        <ul id="chatFriends" class="list-unstyled mb-0">

                            <ChatListItem v-for="dialog in dialogsList"
                                          @switchToChat="onSwitchToChat"
                                          v-bind:dialog="dialog" v-bind:currentDialogID="currentDialogID"
                                          v-bind:key="dialog.id">
                            </ChatListItem>
                        </ul>
                    </vue-custom-scrollbar>
                </div>

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

    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';

import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';
import Spinner from '../common/Spinner.vue';

import ChatDialogsFilter from './ChatDialogsFilter.vue';
import ChatListItem from '../common/Chat/ChatListItem.vue';

import ChatHeader from '../common/Chat/ChatHeader.vue';
import ChatMessages from '../common/Chat/ChatMessages.vue';
import ChatFooter from '../common/Chat/ChatFooter.vue';

import PliziDialog from '../classes/PliziDialog.js';
import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatsListPage',
components: {
    vueCustomScrollbar,
    AccountToolbarLeft, AccountToolbarRight,
    Spinner,
    ChatDialogsFilter, ChatListItem,
    ChatHeader, ChatMessages, ChatFooter,
},

data() {
    return {
        componentKey: 0,
        chatCarrier   : null,
        isDialogsLoaded: false,
        currentDialog : {},
        messagesList  : [],
        isMessagesLoaded: false,

        filter : {
            text: '',
            range: null,
        },

        dialogFilter: {
            text: ``,
        },

        dialogsSearchedList: null,
        changedHeight: '',
        customScrollBarSettings: {
            maxScrollbarLength: 60,
            useBothWheelAxes: false,
            suppressScrollX: true
        }
    }
},

computed: {
    dialogsList(){
        const dlgList = this.$root.$user.dm.asArray();

        if ( this.dialogFilter.text.length < 3 )
            return dlgList;

        return dlgList.filter(dlgItem => dlgItem.checkInAttendees(this.dialogFilter.text) );
    },

    currentDialogID(){
        return (this.currentDialog) ? +this.currentDialog.id : -1;
    }
},

methods: {
    onUpdateMessagesFilterText(evData){
        this.filter.text = evData.text ? evData.text.trim() : '';
        this.filter.range = evData.range && evData.range.start && evData.range.end ? evData.range : null;
        this.$forceUpdate();
    },

    onUpdateDialogsFilterText(evData){
        this.dialogFilter.text = evData.text ? evData.text.trim() : '';
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

    /**
     *  для кратости записи
     * @returns {boolean} - true если диалоги есть
     */
    checkIsDialogsList(){
        return (this.$root.$user.dm.size > 0);
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

    addMessageToMessagesList(evData){
        this.messagesList.push( new PliziMessage(evData) );
    },

    updateDialogsList(chatID, evData){
        const updatedFields = {
            lastMessageDT : evData.message.createdAt,
            lastMessageText : evData.message.body,
            isLastFromMe : !!evData.message.isMine,
            isRead : !!evData.message.isRead
        };

        this.$root.$user.dm.dialogStateUpdated(chatID, updatedFields);
    },

    async onSwitchToChat(evData) {
        window.console.log(`onSwitchToChat`);
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        this.currentDialog =  window.app.$root.$user.dm.getByID(+evData.chatId);

        try {
            msgsResponse = await this.$root.$api.chatMessages(evData.chatId);
            //msgsResponse = await this.$root.$api.chat.messages(evData.chatId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        await this.$store.dispatch('SET_ACTIVE_DIALOG', evData.chatId);

        this.messagesList = [];
        msgsResponse.map( (msg) => {
            this.addMessageToMessagesList(msg);
        });

        this.isMessagesLoaded = true;
    },

    async loadDialogsList() {
        window.console.log(`loadDialogsList`);
        this.isDialogsLoaded = true;

        const lastDialogID = this.$store.getters.activeDialog;
        window.console.log(lastDialogID, `lastDialogID`);
        this.currentDialog = this.$root.$user.dm.getByID(lastDialogID);

        if (typeof this.currentDialog === 'undefined') {
            this.currentDialog = this.$root.$user.dm.firstDialog;
        }

        if (this.currentDialog) {
            await this.$store.dispatch('SET_ACTIVE_DIALOG', this.currentDialog.id);
        }

        return true;
    },

    /**
     * @deprecated
     * @TGA будет актуально когда бэкенд будет делать морфологический поиск
     * @returns {Promise<void>}
     */
    async searchDialog() {
        if (!this.dialogFilter.text) {
            this.dialogsSearchedList = null;
            return;
        }

        let response;

        try {
            response = await this.$root.$api.dialogSearchByName(this.dialogFilter.text);
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response) {
            this.dialogsSearchedList = [];

            response.map( (dlgItem) => {
                this.dialogsSearchedList.push( new PliziDialog(dlgItem) );
            });
        }
    },

    async onDialogsListLoad(){
        if (this.isDialogsLoaded)
            return;

        await this.loadDialogsList();

        if ( this.currentDialog ) {
            await this.onSwitchToChat( { chatId : this.currentDialog.id })
        }
        else {
            window.console.warn(`Условие не сработало!`);
        }
    }
},

created(){
    this.$root.$on('DialogsIsLoaded', this.onDialogsListLoad);

    this.$root.$on('newMessageInDialog', this.addNewChatMessageToList);
    this.$root.$on('removeMessageInDialog', this.removeMessageInList);
},

mounted() {
    if (this.$root.$user.dm.isLoad) {
        this.onDialogsListLoad();
    }
},

}
</script>
