<template>
    <div class="chat-dialogs-list col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-sm-0 px-md-0 h-100 border-right">

        <ChatDialogsFilter @ChatDialogsFilter="onChatDialogsFilter"></ChatDialogsFilter>

        <vue-custom-scrollbar class="chat-list-scroll pb-0 pb-4"
                              :settings="customScrollBarSettings">
            <ul id="chatDialogsList" class="list-unstyled mb-0">
                <ChatListItem v-for="dialog in dialogsList"
                              @SwitchToChat="onSwitchToChat"
                              :id="'dialogItem-'+dialog.id"
                              v-bind:dialog="dialog"
                              v-bind:currentDialogID="currentDialogID"
                              v-bind:key="dialog.id">
                </ChatListItem>
            </ul>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar';

import ChatDialogsFilter from './ChatDialogsFilter.vue';
import ChatListItem from './ChatListItem.vue';

import PliziDialog from '../../classes/PliziDialog.js';

export default {
name : 'ChatDialogs',
components : { ChatDialogsFilter, ChatListItem, VueCustomScrollbar },
props : {
    currentDialogID : {},
    ChatDialogsFilter : {}
},

data(){
    return {
        dialogFilter: {
            text: ``,
        },

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
},

methods: {
    onSwitchToChat(evData){
        this.$emit('SwitchToChat', evData);
    },

    onChatDialogsFilter(evData){
        this.dialogFilter.text = evData.text ? evData.text.trim() : '';
    },

    onRemoveChatDialog(evData){
        window.console.log(evData.chatId, `onRemoveChatDialog`);

        window.console.log(this.$root.$user.dm.shortList());

        this.$root.$user.dm.delete( evData.chatId );

        window.console.log(this.$root.$user.dm.shortList());

        const newPickedChat = (this.$root.$user.dm.size > 0) ? this.$root.$user.dm.firstDialog.id : -1;

        this.$emit('SwitchToChat', { chatId: newPickedChat });

        /** FIXME: @TGA: удаление через DOM это костыль, надо потом добиться автоудаления **/
        let $elem = document.getElementById('dialogItem-'+evData.chatId);
        window.console.log($elem);
        if ($elem){
            $elem.remove();
        }
    },

    onUpdateChatDialog(evData){
        const updatedFields = {
            lastMessageDT : evData.message.createdAt,
            lastMessageText : evData.message.body,
            isLastFromMe : !!evData.message.isMine,
            isRead : !!evData.message.isRead
        };

        this.$root.$user.dm.dialogStateUpdated(evData.chatId, updatedFields);
    },

    async loadDialogsList() {
        this.isDialogsLoaded = true;

        const lastDialogID = window.localStorage.getItem('pliziActiveDialog');
        this.currentDialog = this.$root.$user.dm.get(lastDialogID);

        if (typeof this.currentDialog === 'undefined') {
            this.currentDialog = this.$root.$user.dm.firstDialog;
        }

        if (this.currentDialog) {
            window.localStorage.setItem('pliziActiveDialog', this.currentDialog.id);
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
            response = await this.$root.$api.$chat.dialogSearchByName(this.dialogFilter.text);
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
        await this.loadDialogsList();

        if ( this.currentDialog ) {
            await this.onSwitchToChat( { chatId : this.currentDialog.id })
        }
        else {
            window.console.warn(`Условие не сработало!`);
        }
    },

},

created(){
    this.$root.$on('DialogsIsLoaded', this.onDialogsListLoad);
    this.$root.$on('DialogsIsRestored', this.onDialogsListLoad);

    this.$root.$on('RemoveChatDialog', this.onRemoveChatDialog);
    this.$root.$on('UpdateChatDialog', this.onUpdateChatDialog);
},

async mounted(){
    await this.$root.$user.dm.load();
    this.onDialogsListLoad();
}

}
</script>
