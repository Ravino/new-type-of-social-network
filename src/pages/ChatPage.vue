<template>
    <div class="row">
        <div class="col-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-11">
            <ChatMainComponent v-bind:friends="friendsList" v-bind:messages="messagesList" v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatMainComponent>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../components/AccountToolbarLeft.vue';
import ChatMainComponent from '../components/ChatMainComponent.vue';

import chatFriendsListData from '../data/chatFriendsList.js';
import chatMessagesListData from '../data/chatMessagesList.js';

// #3d51de - цвет фона для своих мессаджей

export default {
name: 'ChatPage',
    components: {
        AccountToolbarLeft, ChatMainComponent
    },

data() {
    return {
        friendsList: chatFriendsListData,
        messagesList: chatMessagesListData,
        companion: this.prepareCompanion(),
        selfPerson: {
            name: `Александра`,
            userPic : `/src/images/chat/alexandra.png`,
        },
    }
},

methods:{
    prepareCompanion(){
        let comp = chatFriendsListData[0];
        comp.isType = true;
        comp.lastActivityDT = `2020-03-29 16:11:00`;

        return comp;
    }
},

mounted() {
    this.$root.$on('addNewChatMessage', (evData) => {
        this.messagesList.push(evData);
    });
}

}
</script>

<style>
    :root {
        --chat-message-radius: 20px;
        --chat-message-margin: 10px;
        --chat-message-padding: 10px;
    }

    .my-message {
        background-color: #3d51de;
        color: white;
        border-radius: var(--chat-message-radius) var(--chat-message-radius) 0px var(--chat-message-radius);
        display: block;
        float: right;
    }

    .companion-message {
        background-color: white;
        border: 1px solid grey;
        border-radius: var(--chat-message-radius) var(--chat-message-radius) var(--chat-message-radius) 0px;
        float: left;
    }

    .my-message, .companion-message {
        padding: var(--chat-message-padding);
        margin: var(--chat-message-margin);
        display: block;
        max-width: 75%;
    }
</style>
