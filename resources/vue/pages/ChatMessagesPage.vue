<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-11 col-xl-11">
            <div id="chatMessangesWrapperSM" class="bg-light w-75 d-flex flex-column d-md-none d-sm-none">
                <ChatHeader v-bind:companion="companion"></ChatHeader>
                <ChatMessages v-bind:messages="messagesList" v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatMessages>
                <ChatFooter v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatFooter>
            </div>
        </div>

        <div class="col-sm-2 col-md-2 d-lg-none d-xl-none">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';

import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatFooter from '../components/ChatFooter.vue';

import chatFriendsListData from '../data/chatFriendsList.js';
import chatMessagesListData from '../data/chatMessagesList.js';


export default {
name: 'ChatsListPage',
    components: {
        AccountToolbarLeft, AccountToolbarRight,
        ChatHeader, ChatMessages, ChatFooter
    },

data() {
    return {
        friendsList: chatFriendsListData,
        messagesList: chatMessagesListData,
        companion: this.prepareCompanion(),
        selfPerson: {
            name: `Александра`,
            userPic : `/images/chat/alexandra.png`,
        },
    }
},

methods:{
    prepareCompanion(){
        let comp = chatFriendsListData[0];
        comp.isType = false;
        comp.lastActivityDT = `2020-03-29 16:11:00`;

        return comp;
    }
},

mounted() {
    this.$root.$on('addNewChatMessage', (evData) => {
        window.console.log('Message');
        this.messagesList.push(evData);
    });

    this.$root.$on('switchToChat', (evData) => {
        window.console.log('switchToChat');
        this.friendsList = this.friendsList.map((friend, friendIndex) => {
            if (friend.isSelected)
                friend.isSelected = false;

            if (friendIndex === evData.friendID) {
                friend.isSelected = true;
            }

            return friend;
        })
    });
},

beforeMount() {
    let gwt = window.localStorage.getItem('pliziJWToken');
    if (typeof gwt === 'undefined'  ||  ''===gwt  || null===gwt) {
        this.router.push({ path: '/login' });
    }
}


}
</script>

<style>
    :root {
        --chat-message-radius: 20px;
        --chat-message-margin: 12px;
        --chat-message-padding: 12px;
    }

    .message-item.my-message, .message-item.companion-message {
        display: block;
        max-width: 80%;
        margin: var(--chat-message-margin);
    }

    .message-item.my-message.compact-message, .message-item.companion-message.compact-message {
        margin-top: calc(var(--chat-message-margin)/4);
        margin-bottom: 0px;
    }

    .message-item.my-message {
        display: block;
        float: right;
    }

    .message-item.my-message .message-body {
        background-color: #3d51de;
        border-radius: var(--chat-message-radius) var(--chat-message-radius) 0px var(--chat-message-radius);
        padding: var(--chat-message-padding);

        display: block;
        float: right;
    }

    .message-item.companion-message {
        display: block;
        float: left;
    }

    .message-item.companion-message .message-body {
        background-color: white;
        border: 1px solid grey;
        border-radius: var(--chat-message-radius) var(--chat-message-radius) var(--chat-message-radius) 0px;
        padding: var(--chat-message-padding);

        display: block;
        float: left;
    }

    .message-item .message-user-pic {
        width: 32px;
        height: 32px;
        display: block;
    }

    .message-item.companion-message .message-user-pic {
        margin-right: 10px;
        float: left;
    }

    .message-item.my-message .message-user-pic {
        margin-left: 10px;
        float: right;
    }

    .message-item.companion-message .message-text {
        display: block;
        float: left;
        color: #363636;
    }

    .message-item.my-message .message-text {
        display: block;
        float: right;
        color: white;
    }

    .message-item.companion-message .message-time {
        display: block;
        float: right;
        padding-left: 10px;
        color: #C1BFBF;
    }

    .message-item.my-message .message-time {
        display: block;
        float: left;
        padding-right: 10px;
        color: #DEE2FD;
    }

</style>
