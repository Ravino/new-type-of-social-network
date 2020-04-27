<template>
    <div class="plz-favorit-friends-item d-flex align-items-center align-items-center py-2 px-3"
         :class="{ active: chatWindowShown }"
         @click="showRelatedChat()">

        <div class="plz-favorit-friend-userpic">
            <img class="plz-favorit-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName" />

            <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
            <div v-else class="">
                <span v-if="friend.isOnline" class="plz-favorit-isonline" title="в сети"></span>
                <span v-else class="plz-favorit-isoffline" :title="getSexTitle"></span>
            </div>
        </div>

        <div v-if="!isNarrow" class="plz-favorit-friend-title flex align-items-center mr-auto ">
            <span class="plz-favorit-friend-name">{{friend.firstName}}</span>

            <div class="plz-favorit-friend-status">
                <p v-if="friend.isType">
                            <span class="loading">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                    Печатает
                </p>
                <p v-else-if="friend.isOnline">
                    В сети
                </p>
                <p v-else>
                    {{ getSexTitle(friend) }}
                </p>
            </div>
        </div>

        <span v-if="!isNarrow" class="plz-ff-messages-count">
            <span v-if="(friend.messagesNumber > 0)" class="py-0 mr-2">
                {{friend.messagesNumber}}
            </span>
        </span>
    </div>
</template>

<script>
import FriendItemMixin from '../mixins/FriendItemMixin.js';

export default {
name : 'FavoritFriendItem',
mixins : [FriendItemMixin],
props : {
    isNarrow: {
        type: Boolean,
        required: false,
        default: false
    }
},

data(){
    return {
        chatWindowShown: false,
        messageWriting: false  // TODO: используется, когда пользователь печатает
    }
},

methods: {
    showRelatedChat(){
        this.chatWindowShown = !this.chatWindowShown;
        //this.$root.$alert(`По клику будем показывать привязанный чат`, 'bg-info', 5);
    },
},


}
</script>
