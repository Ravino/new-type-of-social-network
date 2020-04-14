<template>
    <div id="chatMessagesBody" class="w-100 align-self-stretch py-4 h-100 position-relative">
        <div class="d-flex flex-column --align-items-start">
            <ChatMessageItem v-for="(message, messageIndex) in messages"
                             v-bind:currentDialog="currentDialog"
                             v-bind:message="message"
                             v-bind:next="getNext(messageIndex)"
                             v-bind:key="messageIndex">
            </ChatMessageItem>
        </div>
        <!-- TODO: показать при появлении чекбокса -->
        <div v-if="true" class="messages-edit-group btn-group bg-white-br20 d-flex overflow-hidden">
            <button class="btn btn-message-share d-flex align-items-center justify-content-center border-right ">
                <IconShare  />
                Переслать
            </button>
            <button class="btn btn-message-basket d-flex align-items-center justify-content-center ">
                <IconBasket  />
                Переслать
            </button>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
import ChatMessageItem from './ChatMessageItem.vue';
import IconShare from "../icons/IconShare.vue";
import IconBasket from "../icons/IconBasket.vue";

export default {
name: 'ChatMessages',
props: {
    messages: Array,
    currentDialog : Object
},
components: {IconBasket, IconShare, ChatMessageItem},

data() {
    return {
        previousMsg: null
    }
},

methods: {
    getNext(currIndex) {
        let ret = (currIndex < this.messages.length) ? this.messages[currIndex + 1] : null;
        return (typeof ret === 'undefined') ? null : ret;
    }
},

}
</script>
