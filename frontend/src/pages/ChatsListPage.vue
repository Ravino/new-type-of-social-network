<template>
    <div class="row" :class="{ 'is-chatPage' : ('ChatsListPage'===this.$root.$router.currentRoute.name) }" >
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 chat-page-height overflow-hidden">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-11 pr-3  chat-page-height">
            <div v-if="checkIsDialogsList()" id="chatMain" class="row bg-white-br20 overflow-hidden" :key="componentKey+100">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">
                    <vue-custom-scrollbar class="chat-list-scroll py-4 h-100" :settings="customScrollBarSettings" @ps-scroll-y="scrollHandle">
                        <ul id="chatFriends" class="list-unstyled mb-0">
                            <ChatListItem v-for="(dialog, dialogIndex) in dialogsList"
                                          v-bind:dialog="dialog" v-bind:currentDialogID="currentDialogID"
                                          v-bind:key="dialogIndex+componentKey">
                            </ChatListItem>
                        </ul>
                    </vue-custom-scrollbar>
                </div>

                <div id="chatMessangesWrapper"
                     class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-flex flex-column p-0 h-100">
                    <ChatHeader v-bind:currentDialog="currentDialog"></ChatHeader>

                    <ChatMessages v-if="isMessagesLoaded" v-bind:messages="messagesList" v-bind:currentDialog="currentDialog"></ChatMessages>
                    <Spinner v-else v-bind:message="`Сообщения загружаются,<br />можно выбрать другой диалог`"></Spinner>

                    <ChatFooter v-bind:currentDialog="currentDialog" ref="ChatFooter"></ChatFooter>
                </div>
            </div>

            <div v-else class="row bg-white-br20"  :key="componentKey+120">
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
    Spinner,
    AccountToolbarLeft, ChatListItem, ChatHeader, ChatMessages, ChatFooter,
    vueCustomScrollbar
},

data() {
    return {
        componentKey: 0,
        chatCarrier   : null,
        isDialogsLoaded: false,
        currentDialog : {},
        messagesList  : [],
        isMessagesLoaded: false,

        customScrollBarSettings: {
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
                this.updateDialogsList({
                    message : data.data,
                    dialog: this.currentDialog
                }, 'other')
            }
        });
    },


    addMessageToMessageList(evData){
        this.messagesList.push(evData);
    },


    updateDialogsList(evData, wMode){
        const updatedFields = {
            lastMessageDT : evData.message.createdAt,
            lastMessageText : evData.message.body,
            isLastFromMe : (`mine` === wMode),
            isRead : (`mine` === wMode)
        };

        this.$root.$user.dialogStateUpdated(+evData.dialog.id, updatedFields);
    },


    async switchToChat(evData) {
        let msgsResponse = null;
        this.isMessagesLoaded = false;

        try {
            msgsResponse = await this.$root.$api.chatMessages(evData.dialogID);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        await this.$store.dispatch('SET_ACTIVE_DIALOG', evData.dialogID);

        this.messagesList = [];
        msgsResponse.map( (msg) => {
            this.messagesList.push( new PliziMessage(msg) );
        });

        //this.currentDialog = this.dialogsList.find((dialog) => dialog.id === evData.dialogID);
        this.currentDialog = this.$root.$user.dialogsSearch(+evData.dialogID);

        this.isMessagesLoaded = true;
    },


    async loadDialogsList() {
        this.isDialogsLoaded = true;

        const lastDialogID = +this.$store.getters.activeDialog;
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


    /**
     *  для кратости записи
     * @returns {boolean} - true если dialogsList определён и массив
     */
    checkIsDialogsList(){
        window.console.log(`checkIsDialogsList`);
        return (this.$root.$user.dialogsNumber > 0);
    },


    scrollHandle(evt) {
        //console.log(evt);
    },

    addNewChatMessageToList(evData) {
        this.addMessageToMessageList(evData.message);
        this.updateDialogsList(evData, 'mine');

        this.componentKey ++;

        //this.$forceUpdate();
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

async mounted() {
    await this.loadDialogsList();

    this.connectToChatChannel();

    if ( this.checkIsDialogsList()  &&  this.currentDialog ) {
        await this.switchToChat( { dialogID : this.currentDialog.id })
    }

    this.$root.$on('switchToChat', this.switchToChat);
    this.$root.$on('addNewChatMessageToList', this.addNewChatMessageToList);
    this.$root.$on('dialogsLoad', ()=>{
        this.$forceUpdate();
    });

    this.$forceUpdate();
},

}



</script>

