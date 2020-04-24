<template>
    <div id="chatMessagesBody" class="w-100 align-self-stretch position-relative">
        <vue-custom-scrollbar class="chat-messages-scroll py-4"  :settings="customScrollbarSettings" >
            <div class="d-flex flex-column --align-items-start">
                <transition-group name="slide-fade" :duration="700">
                    <ChatMessageItem v-for="(message, messageIndex) in filteredMessages"
                                     v-if="message.id !== removeMessageID"
                                     @ChatMessagePick="onChatMessagePick"
                                     @ShowForwardMessageModal="onShowForwardMessageModal"
                                     @RemoveMessage="onRemoveMessage"
                                     @openChatVideoModal="openChatVideoModal"
                                     v-bind:message="message"
                                     v-bind:next="getNext(messageIndex)"
                                     v-bind:pickedID="pickedMessageID"
                                     v-bind:key="message.id">
                    </ChatMessageItem>
                </transition-group>
            </div>
        </vue-custom-scrollbar>

        <ResendMessageModal v-if="resendMessageModalShow"
                            v-bind:pickedMessage="pickedMessage"
                            v-bind:currentDialog="currentDialog"
                            v-bind:pickedID="pickedMessageID">
        </ResendMessageModal>

        <ChatVideoModal v-if="chatVideoModalShow"
                        :videoLink="chatVideoModalContent.videoLink"></ChatVideoModal>
    </div>
</template>

<script>
import ChatMessageItem from './ChatMessageItem.vue';

/** @link https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar **/
import vueCustomScrollbar from 'vue-custom-scrollbar';

/** TODO: переименовать в ForwardMessageModal **/
import ResendMessageModal from '../../components/ResendMessageModal.vue';

import PliziMessage from '../../classes/PliziMessage.js';
import ChatVideoModal from './ChatVideoModal.vue';

export default {
name: 'ChatMessages',
components: {
    vueCustomScrollbar,
    ChatMessageItem,
    ResendMessageModal,
    ChatVideoModal,
},

props: {
    messagesList: Array,
    currentDialog : Object,
    filterText: String
},

data() {
    return {
        pickedMessageID: -1,
        removeMessageID: -1,
        previousMsg: null,
        resendMessageModalShow: false,

        customScrollbarSettings: {
            maxScrollbarLength: 60,
            suppressScrollX: true, // rm scroll x
        },
        chatVideoModalShow: false,
        chatVideoModalContent: {
            videoLink: null,
        },
    }
},

methods: {
    onChatMessagePick(evData){
        this.pickedMessageID = evData.messageID;
    },

    openChatVideoModal(evData) {
        if (evData.videoLink) {
            this.chatVideoModalShow = true;
            this.chatVideoModalContent.videoLink = evData.videoLink;
        }
    },

    onRemoveMessage(evData){
        this.removeMessageID = evData.messageID;

        setTimeout(()=>{
            this.removeMessageById(this.removeMessageID);
        }, 500);
    },

    async removeMessageById(msgID){
        const fIndex = this.messagesList.findIndex( (mItem)=>{ return mItem.id === msgID; } );
        this.messagesList.splice(fIndex, 1);

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatMessageDelete(msgID);
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }
    },

    onShowForwardMessageModal(){
        this.resendMessageModalShow = true;
    },

    hideMessageResendModal() {
        this.$root.$emit('hideMessageResendModal', {});
    },

    getNext(currIndex) {
        let ret = (currIndex < this.filteredMessages.length) ? this.filteredMessages[currIndex + 1] : null;
        return (typeof ret === 'undefined') ? null : ret;
    },

    scrollToEnd() {
        return setTimeout(() => {
            const container = this.$el.querySelector('.ps-container'); // TODO: Проскролить каждый
            container.scrollTop = container.scrollHeight;

        }, 500);
    }
},

computed: {
    filteredMessages(){
        const ft = this.filterText.toLocaleLowerCase();

        if (ft.length > 2)
            return this.messagesList.filter((msgItem)=>{ return msgItem.body.toLowerCase().includes(ft); });

        return this.messagesList;
    },

    pickedMessage(){
        if (this.pickedMessageID < 0)
            return {};

        let lMsg = this.messagesList.find( (mItem)=>{ return mItem.id === this.pickedMessageID; } );
        if (lMsg) {
            lMsg = new PliziMessage(lMsg);
        }
        else {
            window.console.warn(this.pickedMessageID + ` не найден`);
        }

        return lMsg;
    }
},

mounted() {
    this.$root.$on('hideMessageResendModal', (evData) => {
        this.resendMessageModalShow = false;
    });

    this.$root.$on('hideChatVideoModal', () => {
        this.chatVideoModalShow = false;
    });

    this.scrollToEnd();
},

updated() {
    // @TGA походу именно это вызывает прыжок чата
    //this.scrollToEnd();
}

}
</script>
