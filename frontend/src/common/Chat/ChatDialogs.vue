<template>
    <div class="chat-dialogs-list col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto px-0 ">

        <ChatDialogsFilter @ChatDialogsFilter="onChatDialogsFilter"></ChatDialogsFilter>

        <vue-custom-scrollbar class="chat-list-scroll pb-0 pb-4"
                              :settings="customScrollBarSettings">
            <ul id="chatDialogsList" class="list-unstyled mb-0" v-bind:key="dialogsListKey">
                <ChatListItem v-for="dialog in dialogsList()"
                              @PickChat="onSwitchToChat"
                              :id="'dialogItem-'+dialog.id"
                              v-bind:dialog="dialog"
                              v-bind:currentDialogID="currentDialogID"
                              v-bind:key="dialogsListItemKey(dialog)">
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
    dialogsLength(){
        return this.$root.$auth.dm.size;
    },

    dialogsListKey(){
        return 'dialogsList-'+this.dialogKeyUpdater+'-'+this.$root.$auth.dm.size+'-'+ (new Date()).getMilliseconds();
    }
},

methods: {
    dialogsList(){
        const dlgList = this.$root.$auth.dm.asArray().slice();

        if ( this.dialogFilter.text.length < 3 )
            return dlgList;

        return dlgList.filter(dlgItem => dlgItem.checkInAttendees(this.dialogFilter.text) );
    },

    dialogsListItemKey(dialog){
        return 'dialogItem-'+dialog.id+'-'+this.dialogKeyUpdater+ (new Date()).getMilliseconds();
    },

    onSwitchToChat(evData){
        this.$emit('SwitchToChat', evData);
    },


    onChatDialogsFilter(evData){
        this.dialogFilter.text = evData.text ? evData.text.trim() : '';
    },


    onRemoveChatDialog(evData){
        this.$root.$auth.dm.delete( evData.chatId );

        const newPickedChat = (this.$root.$auth.dm.size > 0) ? this.$root.$auth.dm.firstDialog.id : -1;

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
            lastMessageDT : evData.createdAt,
            lastMessageText : evData.body,
            isLastFromMe : !!evData.isMine,
            isRead : !!evData.isRead
        };

        this.$root.$auth.dm.dialogStateUpdated(evData.chatId, updatedFields);
        this.dialogKeyUpdater++;
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
},

created(){
    this.$root.$on(this.$root.$auth.dm.loadEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.loadEventName);
    });

    this.$root.$on(this.$root.$auth.dm.restoreEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.restoreEventName);
    });

    this.$root.$on(this.$root.$auth.dm.updateEventName, ()=>{
        this.onDialogsListLoad(this.$root.$auth.dm.updateEventName);
    });

    this.$root.$on('RemoveChatDialog', this.onRemoveChatDialog);
    this.$root.$on('UpdateChatDialog', this.onUpdateChatDialog);
},

async mounted(){
    if (! this.listFilled) {
        this.onDialogsListLoad(`mounted`);
    }
}

}
</script>
