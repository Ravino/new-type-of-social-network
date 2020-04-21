<template>
    <div id="chatMessagesBody" class="w-100 align-self-stretch position-relative">
        <vue-custom-scrollbar class="chat-messages-scroll py-4"  :settings="customScrollbarSettings" >
            <div class="d-flex flex-column --align-items-start">
                <ChatMessageItem v-for="(message, messageIndex) in filteredMessages"
                                 v-bind:message="message"
                                 v-bind:next="getNext(messageIndex)"
                                 v-bind:key="messageIndex">
                </ChatMessageItem>
            </div>
        </vue-custom-scrollbar>

        <!-- TODO: показать при появлении чекбокса -->
        <div v-if="isShowPopupMessageMenu" class="messages-edit-group btn-group bg-white-br20 d-flex overflow-hidden">
            <button class="btn btn-message-share d-flex align-items-center justify-content-center border-right "
                    @click="openResendMessageModal()">
                <IconShare  />
                Переслать
            </button>
            <button class="btn btn-message-basket d-flex align-items-center justify-content-center ">
                <IconBasket  />
                Удалить
            </button>
        </div>

        <ResendMessageModal v-if="resendMessageModalShow" v-bind:reg-modal-visible="resendMessageModalShow">
        </ResendMessageModal>
    </div>

</template>

<script>
import ChatMessageItem from './ChatMessageItem.vue';
import IconShare from '../icons/IconShare.vue';
import IconBasket from '../icons/IconBasket.vue';

/** @link https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar **/
import vueCustomScrollbar from 'vue-custom-scrollbar';

/** TODO: переименовать в ForwardMessageModal **/
import ResendMessageModal from './ResendMessageModal.vue';

//import PliziMessage from "../classes/PliziMessage";


export default {
name: 'ChatMessages',
props: {
    messagesList: Array,
    currentDialog : Object,
    filterText: String
},
components: {
    IconBasket, IconShare, ChatMessageItem,
    vueCustomScrollbar,
    ResendMessageModal
},

data() {
    return {
        previousMsg: null,
        resendMessageModalShow: false,
        isShowPopupMessageMenu: false,

        customScrollbarSettings: {
            maxScrollbarLength: 60,
            suppressScrollX: true, // rm scroll x
        },
    }
},

methods: {
    hideMessageResendModal() {
        this.$root.$emit('hideMessageResendModal', {});
    },

    openResendMessageModal() {
        this.resendMessageModalShow = true;
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

            //return this.messagesList.filter((msgItem)=>{ return msgItem.body.includes(this.filterText); });

        return this.messagesList;
    }
},

mounted() {
    this.$root.$on('hideMessageResendModal', (evData) => {
        this.resendMessageModalShow = false;
    });

    this.scrollToEnd();

},

updated() {
    this.scrollToEnd();
}

}
</script>
