<template>
    <div class="w-100 align-self-stretch py-4 px-5 h-100 --bg-info">
        <div class="d-flex flex-column --align-items-start">
            <ChatMessageItem v-for="(message, messageIndex) in messages"
                             v-bind:currentDialog="currentDialog"
                             v-bind:message="message"
                             v-bind:next="getNext(messageIndex)"
                             v-bind:key="messageIndex">
            </ChatMessageItem>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
import ChatMessageItem from './ChatMessageItem.vue';

export default {
name: 'ChatMessages',
props: {
    messages: Array,
    currentDialog : Object
},
components: {ChatMessageItem},

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
