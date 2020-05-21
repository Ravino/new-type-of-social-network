<template>
    <div class="chat-dialogs-list col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-0">

        <ChatDialogsFilter @ChatDialogsFilter="onChatDialogsFilter"></ChatDialogsFilter>

        <vue-custom-scrollbar class="chat-list-scroll pb-0 pb-4"
                              :settings="customScrollBarSettings">
            <ul id="chatDialogsList" class="list-unstyled mb-0">
                <ChatListItem v-for="dialog in dialogsList()"
                              @PickChat="onSwitchToChat"
                              :id="'dialogItem-'+dialog.id"
                              v-bind:dialog="dialog"
                              v-bind:currentDialogID="currentDialogID"
                              v-bind:key="dialog.id+`-`+$root.$dialogsKeyUpdater+`-`+$root.$messagesKeyUpdater">
                </ChatListItem>
            </ul>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar';

import ChatDialogsFilter from './ChatDialogsFilter.vue';
import ChatListItem from './ChatListItem.vue';

export default {
name : 'ChatDialogs',
components : { ChatDialogsFilter, ChatListItem, VueCustomScrollbar },
props : {
    currentDialogID : String
},

data(){
    return {
        listFilled: false,
        dialogKeyUpdater: 0,

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

},

methods: {

    dialogsList(){
        const dlgList = this.$root.$auth.dm.asArray();

        if ( this.dialogFilter.text.length < 3 )
            return dlgList;

        return dlgList.filter(dlgItem => dlgItem.checkInAttendees(this.dialogFilter.text) );
    },

    onSwitchToChat(evData){
        this.$emit('SwitchToChat', evData);
    },

    onChatDialogsFilter(evData){
        this.dialogFilter.text = evData.text ? evData.text.trim() : '';
    },

    onRemoveChatDialog(evData){
        this.$root.$auth.dm.onRemoveDialog( evData.chatId );

        if (this.$root.$auth.dm.size > 0) {
            const newPickedChat = this.$root.$auth.dm.firstDialog.id;

            this.$emit('SwitchToChat', { chatId: newPickedChat });
        }
        else {
            window.console.info(`нет диалогов`);
        }
    },

    onUpdateChatDialog(evData) {
        const updatedFields = {
            lastMessageDT : evData.message.createdAt,
            lastMessageText : evData.message.body,
            isLastFromMe : !!evData.message.isMine,
            isRead : !!evData.message.isRead
        };

        this.$root.$auth.dm.dialogStateUpdated(evData.chatId, updatedFields);
        this.$root.$messagesKeyUpdater++;
    },

    async loadDialogsList() {
        this.isDialogsLoaded = true;

        const lastDialogID = window.localStorage.getItem('pliziActiveDialog');
        this.currentDialog = this.$root.$auth.dm.get(lastDialogID);

        if (typeof this.currentDialog === 'undefined') {
            this.currentDialog = this.$root.$auth.dm.firstDialog;
        }

        if (this.currentDialog) {
            window.localStorage.setItem('pliziActiveDialog', this.currentDialog.id);
        }

        return true;
    },


    async onDialogsListLoad(wMode){
        if (this.listFilled)
            return;

        this.dialogKeyUpdater++;

        await this.loadDialogsList();

        this.listFilled = true;

        if ( this.currentDialog ) {
            this.onSwitchToChat( { chatId : this.currentDialog.id })
        }
        else {
            window.console.warn(`Условие не сработало!`);
        }
    }

},

created(){
    this.$root.$on(this.$root.$auth.dm.loadEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.loadEventName);
    });

    this.$root.$on(this.$root.$auth.dm.restoreEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.restoreEventName);
    });

    this.$root.$on('RemoveChatDialog', this.onRemoveChatDialog);
    this.$root.$on('UpdateChatDialog', this.onUpdateChatDialog);
},


beforeDestroy() {
    this.$root.$off(this.$root.$auth.dm.loadEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.loadEventName);
    });

    this.$root.$off(this.$root.$auth.dm.restoreEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.restoreEventName);
    });

    this.$root.$off('RemoveChatDialog', this.onRemoveChatDialog);
    this.$root.$off('UpdateChatDialog', this.onUpdateChatDialog);
},


async mounted(){
    if (! this.listFilled) {
        await this.onDialogsListLoad(`mounted`);
    }
}

}
</script>
