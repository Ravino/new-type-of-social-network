<template>
    <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden pl-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3  chat-page-height">
            <div v-if="checkIsDialogsList()" id="chatMain" class="row bg-white-br20 overflow-hidden">

                <div id="chatMessagesUsersList" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">
                    <div class="find-in-dialogs-form d-flex align-items-center justify-content-end w-100 border-bottom pr-3 py-3">
                        <div class="form-row w-100 align-items-center justify-content-end position-relative pl-4">
                            <div class="find-in-chat-list w-100 position-relative pl-2">
                                <label class="sr-only d-none" for="txtFindInChatList">Поиск</label>
                                <input v-model="dialogFilter.text"
                                       id="txtFindInChatList"
                                       ref="txtFindInChatList"
                                       type="text"
                                       class="chat-search-input form-control rounded-pill bg-light px-4"
                                       @keydown.stop="dialogSearchKeyDownCheck($event)"
                                       placeholder="Поиск в собеседниках" />
                                <button class="find-in-chat-list-btn btn btn-search h-100 shadow-none"
                                        @click="onClickStartDialogFilter()"
                                        type="submit">
                                    <IconSearch />
                                </button>
                            </div>
                        </div>
                    </div>

                    <vue-custom-scrollbar class="chat-list-scroll pb-0 pb-4"
                                          :settings="customScrollBarSettings">
                        <ul id="chatFriends" class="list-unstyled mb-0">
                            <template v-if="dialogsSearchedList && dialogFilter.text.length > 2">
                                <ChatListItem v-for="dialog in dialogsSearchedList"
                                              @switchToChat="onSwitchToChat"
                                              v-bind:dialog="dialog" v-bind:currentDialogID="currentDialogID"
                                              v-bind:key="dialog.id" :ref="`chatDialog-`+dialog.id">
                                </ChatListItem>
                            </template>
                            <template v-else>
                                <ChatListItem v-for="dialog in dialogsList"
                                              @switchToChat="onSwitchToChat"
                                              v-bind:dialog="dialog" v-bind:currentDialogID="currentDialogID"
                                              v-bind:key="dialog.id" :ref="`chatDialog-`+dialog.id">
                                </ChatListItem>
                            </template>
                        </ul>
                    </vue-custom-scrollbar>
                </div>

                <div id="chatMessagesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0 h-100">

                    <ChatHeader v-if="currentDialog" v-bind:currentDialog="currentDialog"
                                @chatFilter="updateFilterText"
                                ref="ChatHeader"></ChatHeader>
                    <div id="chatMessagesWrapperBody"
                         class="position-relative">

                        <ChatMessages v-if="isMessagesLoaded" v-bind:messagesList="messagesList"
                                      v-bind:filter="filter"
                                      v-bind:currentDialog="currentDialog"
                                      :style="`padding-bottom: ${changedHeight}`"
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
import Spinner from '../common/Spinner.vue';

import ChatListItem from '../common/Chat/ChatListItem.vue';

import ChatHeader from '../common/Chat/ChatHeader.vue';
import ChatMessages from '../common/Chat/ChatMessages.vue';
import ChatFooter from '../common/Chat/ChatFooter.vue';

import IconSearch from '../icons/IconSearch.vue';

import PliziDialog from '../classes/PliziDialog.js';
import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatsListPage',
components: {
    vueCustomScrollbar,
    AccountToolbarLeft, Spinner,
    ChatListItem, ChatHeader, ChatMessages, ChatFooter,
    IconSearch,
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
            text: null,
            range: null,
        },

        dialogFilter: {
            text: null,
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
        return this.$root.$user.dialogs;
    },

    currentDialogID(){
        return (this.currentDialog) ? +this.currentDialog.id : -1;
    }
},

methods: {
    updateFilterText(evData){
        this.filter.text = evData.text ? evData.text.trim() : null;
        this.filter.range = evData.range && evData.range.start && evData.range.end ? evData.range : null;
        this.$forceUpdate();
    },

    onChatFooterEditorChangedHeight(evData) {
        this.changedHeight = evData.changedHeight + 'px';
        this.$refs.chatMessages.scrollToEnd();
    },

    /**
     *  для кратости записи
     * @returns {boolean} - true если диалоги есть
     */
    checkIsDialogsList(){
        return (this.$root.$user.dialogsNumber > 0);
    },

    dialogSearchKeyDownCheck(ev) {
        if (8===ev.keyCode  ||  13===ev.keyCode  ||  46===ev.keyCode){
            this.searchDialog();
        }
    },

    onClickStartDialogFilter() {
        this.searchDialog();
    },

    removeMessageInList(evData){
        if (this.currentDialog.id !== evData.chatId)
            return;

        this.messagesList = this.messagesList.filter( mItem => evData.messageId !== mItem.id );

        /** @var PliziMessage **/
        const lastMsg = this.messagesList[this.messagesList.length - 1];

        this.updateDialogsList(evData.chatId, { message: lastMsg });
    },

    addNewChatMessageToList(evData){
        this.addMessageToMessagesList(evData.message);
        this.updateDialogsList(evData.chatId, evData);
        this.$refs.chatMessages.scrollToEnd();

        /** @TGA вообще-то только для того диалога, который открыт **/
        //if (this.$refs.chatMessages) {
        //    this.$refs.chatMessages.scrollToEnd();
        //}
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

        this.$root.$user.dialogStateUpdated(chatID, updatedFields);
    },

    async onSwitchToChat(evData) {
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        try {
            msgsResponse = await this.$root.$api.chatMessages(evData.chatId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        await this.$store.dispatch('SET_ACTIVE_DIALOG', evData.chatId);

        this.messagesList = [];
        msgsResponse.map( (msg) => {
            this.addMessageToMessagesList(msg);
            //this.messagesList.push( new PliziMessage(msg) );
        });

        this.currentDialog = this.$root.$user.dialogsSearch(+evData.chatId);

        this.isMessagesLoaded = true;
    },

    async loadDialogsList() {
        this.isDialogsLoaded = true;

        const lastDialogID = this.$store.getters.activeDialog;

        this.currentDialog = undefined;

        if (this.checkIsDialogsList()) {
            this.currentDialog = this.$root.$user.dialogsSearch(+lastDialogID);
        }

        if (typeof this.currentDialog === 'undefined') {
            this.currentDialog = this.$root.$user.firstDialog;

            if (this.currentDialog) {
                await this.$store.dispatch('SET_ACTIVE_DIALOG', this.currentDialog.id);
            }
        }

        return true;
    },

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
},

async mounted() {
    await this.loadDialogsList();

    if ( this.checkIsDialogsList()  &&  this.currentDialog ) {
        window.console.info(`call to switchToChat`);
        await this.onSwitchToChat( { dialogId : this.currentDialog.id })
    }
    else {
        window.console.warn(`Условие не сработало!`);
    }

    //this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('newMessageInDialog', this.addNewChatMessageToList);
    this.$root.$on('removeMessageInDialog', this.removeMessageInList);

    this.$root.$on('dialogsLoad', ()=>{
        this.$forceUpdate();
    });

    this.$forceUpdate();
},

}
</script>
