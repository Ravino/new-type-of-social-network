<template>
    <div id="chatMessagesBody" class="w-100 align-self-stretch position-relative">
        <vue-custom-scrollbar class="chat-messages-scroll py-4"  :settings="settings"
                              @ps-scroll-y="scrollHanle">
            <div class="d-flex flex-column --align-items-start">
                <ChatMessageItem v-for="(message, messageIndex) in messages"
                                 v-bind:currentDialog="currentDialog"
                                 v-bind:message="message"
                                 v-bind:next="getNext(messageIndex)"
                                 v-bind:key="messageIndex">
                </ChatMessageItem>
            </div>
        </vue-custom-scrollbar>
        <!-- TODO: показать при появлении чекбокса -->
        <div v-if="true" class="messages-edit-group btn-group bg-white-br20 d-flex overflow-hidden">
            <button class="btn btn-message-share d-flex align-items-center justify-content-center border-right ">
                <IconShare  />
                Переслать
            </button>
            <button class="btn btn-message-basket d-flex align-items-center justify-content-center ">
                <IconBasket  />
                Удалить
            </button>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
import ChatMessageItem from './ChatMessageItem.vue';
import IconShare from "../icons/IconShare.vue";
import IconBasket from "../icons/IconBasket.vue";
import vueCustomScrollbar from 'vue-custom-scrollbar';


export default {
name: 'ChatMessages',
props: {
    messages: Array,
    currentDialog : Object
},
components: {
    IconBasket, IconShare, ChatMessageItem,
    vueCustomScrollbar
},

data() {
    return {
        previousMsg: null,
        settings: {
            maxScrollbarLength: 60,

        }
    }
},

methods: {
    getNext(currIndex) {
        let ret = (currIndex < this.messages.length) ? this.messages[currIndex + 1] : null;
        return (typeof ret === 'undefined') ? null : ret;
    },

    scrollHanle(evt) {
        console.log(evt)
    }
},

}
</script>
