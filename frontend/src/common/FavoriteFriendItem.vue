<template>
    <div class="plz-favorit-friends-item d-flex align-items-center align-items-center py-2 px-3"
         :class="{ 'active': chatWindowShown }"
         @click="showRelatedChat()">

        <div class="plz-favorit-friend-userpic"  :class="{'mx-auto' : isNarrow}" >
            <img class="plz-favorit-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName" />

            <div v-if="isTyper" class="writing"><span></span><span></span><span></span></div>
            <div v-else class="">
                <span v-if="friend.isOnline" class="plz-favorit-isonline" title="в сети"></span>
                <span v-else class="plz-favorit-isoffline" title="не в сети"></span>
            </div>
        </div>

        <div v-if="!isNarrow" class="plz-favorit-friend-title flex align-items-center mr-auto ">
            <span class="plz-favorit-friend-name">{{friend.fullName}}</span>

            <div class="plz-favorit-friend-status">
                <p v-if="friend.isOnline">В сети</p>
                <p v-else> {{ favoriteLastActivity }} </p>
            </div>
        </div>

        <span v-if="!isNarrow" class="plz-ff-messages-count">
            <span v-if="(friend.messagesNumber > 0)" class="py-0 mr-2">
                {{friend.messagesNumber}}
            </span>
        </span>

        <div class="plz-linked-chat-block" :class="{ 'active-chat': chatWindowShown }">
            <div class="bg-danger">
                здесь будет город-чат
            </div>
        </div>
    </div>
</template>

<script>
import FriendItemMixin from '../mixins/FriendItemMixin.js';

export default {
name : 'FavoriteFriendItem',
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
        typingTimeout: null,
        isTyper: false,
        lastAct: ''
    }
},

computed: {
    favoriteLastActivity(){
        return this.lastFriendActivity(this.friend);
    }
},

methods: {
    showRelatedChat(){
        this.chatWindowShown = !this.chatWindowShown;

        if (this.chatWindowShown) {
            this.$emit('PickFavorite', {
                friendId : this.friend.id,
            });
        }
        else {
            this.$emit('UnPickFavorite', {
                friendId : this.friend.id,
            });
        }

        //this.$root.$alert(`По клику будем показывать привязанный чат`, 'bg-info', 5);
    },

    /**
     * @param {Object} evData
     */
    onFriendTyping(evData) {
        if (this.friend.id !== evData.user.id)
            return;

        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.isTyper = true;

        this.typingTimeout = setTimeout(() => {
            this.isTyper = false;
        }, 2000);
    }
},

mounted(){
    this.$root.$on('userIsTyping', this.onFriendTyping);
}

}
</script>
