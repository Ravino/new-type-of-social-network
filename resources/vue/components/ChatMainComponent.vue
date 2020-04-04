<template>
    <div id="chatMain" class="row bg-light border">
        <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto pl-lg-0 pl-xl-0 px-sm-0 px-md-0">
            <!--        <ChatList v-bind:friends="friends"></ChatList>-->
            <ul id="chatFriends" class="list-unstyled mb-0">
                <ChatListItem v-for="(dialog, dialogIndex) in dialogs" v-bind:currentDialog="currentDialog" v-bind:dialog="dialog" v-bind:key="dialogIndex" v-bind:dialogID="dialogIndex"></ChatListItem>
            </ul>
        </div>

        <div id="chatMessangesWrapper" class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-block d-xl-block h-100">
            <ChatHeader v-bind:currentDialog="currentDialog"></ChatHeader>
            <ChatMessages v-bind:messages="messages"></ChatMessages>
            <ChatFooter></ChatFooter>
        </div>
    </div>
</template>

<script>
import { HTTPer } from '../httper/httper.js';
import ChatList from '../components/ChatList.vue';
import ChatListItem from '../components/ChatListItem.vue';
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatFooter from './ChatFooter.vue';

export default {
    name: 'ChatMainComponent',
    props: {
        dialogs: Array,
        messages: Array,
        currentDialog: Object
    },
    components: {ChatList, ChatListItem, ChatHeader, ChatMessages, ChatFooter},
    data() {
        return {}
    },

    methods: {},

    mounted() {
    },

    updated() {
    }
}
</script>
