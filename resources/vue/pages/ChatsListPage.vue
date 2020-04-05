<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-10">
            <ChatMainComponent v-bind:dialogs="dialogsList" v-bind:messages="messagesList" v-bind:currentDialog="currentDialog"></ChatMainComponent>
        </div>

        <div class="col-sm-1 col-md-2 col-lg-2 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
    import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
    import AccountToolbarRight from '../common/AccountToolbarRight.vue';

    import ChatMainComponent from '../components/ChatMainComponent.vue';

    import chatFriendsListData from '../data/chatFriendsList.js';
    import chatMessagesListData from '../data/chatMessagesList.js';
    import { HTTPer } from '../httper/httper';

    export default {
        name: 'ChatsListPage',
        components: {
            AccountToolbarLeft, AccountToolbarRight, ChatMainComponent
        },

        data() {
            return {
                dialogsList: [],
                currentDialog: {},
                messagesList: [],
            }
        },

        methods: {
        },

        async mounted() {
            const gwt = window.localStorage.getItem('pliziJWToken');
            const config = {
                headers : {
                    Authorization: `Bearer ${gwt}`
                }
            };

            new ab.connect(wsUrl, s => {
                s.subscribe(this.$store.getters.chatChannel, (topic, data) => {
                    if (this.currentDialog.id === data.data.chatId) {
                        this.messagesList.push(data.data)
                    }
                })
            }, function(code, reason, detail) {
                console.log(reason);
            }, { maxRetries:10, retryDelay:4000, skipSubprotocolCheck:true });

            this.$root.$on('addNewChatMessage', async (evData) => {
                await HTTPer.post('api/chat/send', {
                    body: evData.body,
                    chat_id: this.currentDialog.id
                }, config);
                this.messagesList.push(evData);
            });

            let response = await HTTPer.get('api/chat/dialogs', config);
            this.dialogsList = response.data;
            this.currentDialog = this.dialogsList[0];

            let messageResponse = await HTTPer.get('api/chat/messages/' + this.dialogsList[0].id, config);
            this.messagesList = messageResponse.data;

            this.$root.$on('switchToChat', async (evData) => {
                let messageResponse = await HTTPer.get('api/chat/messages/' + evData.dialogID, config);
                this.messagesList = messageResponse.data;
                this.currentDialog = this.dialogsList.find((dialog) => dialog.id === evData.dialogID);
            });
        },

        beforeMount() {
            let gwt = window.localStorage.getItem('pliziJWToken');
            if (typeof gwt === 'undefined' || '' === gwt || null === gwt) {
                this.router.push({path: '/login'});
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
        margin-top: calc(var(--chat-message-margin) / 4);
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
