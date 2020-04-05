<template>
    <div class="w-100 align-self-stretch my-auto --bg-info">
        <div class="d-flex flex-column --align-items-start">
            <ChatMessageItem v-for="(message, messageIndex) in messages"
                             v-bind:message="message" v-bind:next="getNext(messageIndex)"
                             v-bind:key="messageIndex">
            </ChatMessageItem>
<!--            <div v-if="companion.isType">-->
<!--                <ChatMessageItem v-bind:message="typingMessage" v-bind:companion="companion" v-bind:next="null"-->
<!--                                 v-bind:self-person="selfPerson"></ChatMessageItem>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import {HTTPer} from '../httper/httper.js';
    import ChatMessageItem from './ChatMessageItem.vue';

    export default {
        name: 'ChatMessages',
        props: {
            messages: Array,
        },
        components: {ChatMessageItem},
        data() {
            return {
                typingMessage: {
                    message: 'Печатает...',
                    dtLabel: moment().format(`YYYY-MM-DD HH:mm:ss`) + '',
                    isMine: false,
                    isRead: false,
                    isEdited: false
                },
                previousMsg: null
            }
        },

        methods: {
            getNext(currIndex) {
                let ret = (currIndex < this.messages.length) ? this.messages[currIndex + 1] : null;
                return (typeof ret === 'undefined') ? null : ret;
            }
        },

        mounted() {
        },

    }
</script>
