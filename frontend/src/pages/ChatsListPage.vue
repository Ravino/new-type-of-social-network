<template>
    <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3  chat-page-height">
            <div v-if="checkIsDialogsList()" id="chatMain" class="row bg-white-br20 overflow-hidden">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">
                    <vue-custom-scrollbar class="chat-list-scroll py-4 h-100"
                                          :settings="customScrollBarSettings"
                                          @ps-scroll-y="scrollHandle">
                        <ul id="chatFriends" class="list-unstyled mb-0">
                            <ChatListItem v-for="dialog in dialogsList"
                                          v-bind:dialog="dialog" v-bind:currentDialogID="currentDialogID"
                                          v-bind:key="dialog.id" :ref="`chatDialog-`+dialog.id">
                            </ChatListItem>
                        </ul>
                    </vue-custom-scrollbar>
                </div>

                <div id="chatMessagesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0 h-100">
                    <ChatHeader v-if="currentDialog" v-bind:currentDialog="currentDialog"
                                @chatFilter="updateFilterText"
                                ref="ChatHeader"></ChatHeader>

                    <ChatMessages v-if="isMessagesLoaded" v-bind:messagesList="messagesList"
                                  v-bind:filterText="filterText"
                                  v-bind:currentDialog="currentDialog">
                    </ChatMessages>
                    <Spinner v-else v-bind:message="`Сообщения загружаются,<br />можно выбрать другой диалог`"></Spinner>

                    <ChatFooter v-if="currentDialog"
                                v-bind:currentDialog="currentDialog"
                                ref="ChatFooter"></ChatFooter>
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

import ChatListItem from '../components/ChatListItem.vue';

import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatFooter from '../components/ChatFooter.vue';

import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatsListPage',
components: {
    vueCustomScrollbar,
    AccountToolbarLeft, Spinner,
    ChatListItem, ChatHeader, ChatMessages, ChatFooter,
},

data() {
    return {
        componentKey: 0,
        chatCarrier   : null,
        isDialogsLoaded: false,
        currentDialog : {},
        messagesList  : [],
        filterText  : '',
        isMessagesLoaded: false,

        customScrollBarSettings: {
            maxScrollbarLength: 60,
            useBothWheelAxes: false,
            suppressScrollX: true
        },
    }
},

methods: {

    updateFilterText(evData){
        this.filterText = (evData.filterText + ``).trim();
        this.$forceUpdate();
    },

    /**
     *  для кратости записи
     * @returns {boolean} - true если диалоги есть
     */
    checkIsDialogsList(){
        return (this.$root.$user.dialogsNumber > 0);
    },

    async switchToChat(evData) {
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        try {
            msgsResponse = await this.$root.$api.chatMessages(evData.dialogId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        await this.$store.dispatch('SET_ACTIVE_DIALOG', evData.dialogId);

        this.messagesList = [];
        msgsResponse.map( (msg) => {
            this.messagesList.push( new PliziMessage(msg) );
        });

        this.currentDialog = this.$root.$user.dialogsSearch(+evData.dialogId);

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

    scrollHandle(evt) {
        //console.log(evt);
    },

    addNewChatMessageToList(evData){
        this.addMessageToMessageList(evData.message);
        this.updateDialogsList(evData);
    },

    addMessageToMessageList(evData){
        this.messagesList.push( new PliziMessage(evData) );
    },

    updateDialogsList(evData){
        const updatedFields = {
            lastMessageDT : evData.message.createdAt,
            lastMessageText : evData.message.body,
            isLastFromMe : !!evData.message.isMine,
            isRead : !!evData.message.isRead
        };

        this.$root.$user.dialogStateUpdated(+evData.dialogId, updatedFields);
        //this.$root.$user.dialogsRearrange();

        this.$forceUpdate();
    },
},


computed: {
    dialogsList(){
        return this.$root.$user.dialogs;
    },

    currentDialogID(){
        return (this.currentDialog) ? +this.currentDialog.id : -1;
    }
},

async mounted() {
    await this.loadDialogsList();

    if ( this.checkIsDialogsList()  &&  this.currentDialog ) {
        await this.switchToChat( { dialogId : this.currentDialog.id })
    }

    this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('newMessageInDialog', this.addNewChatMessageToList);

    this.$root.$on('dialogsLoad', ()=>{
        this.$forceUpdate();
    });

    this.$forceUpdate();
},

}
</script>

