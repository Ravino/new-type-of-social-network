<template>
    <div class="plz-favorit-friends-item d-flex align-items-center align-items-center py-1 px-3" @click="showRelatedChat()">

        <div class="plz-favorit-friend-userpic">
            <img class="plz-favorit-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName" />

            <span v-if="friend.isOnline" class="plz-favorit-isonline" title="в сети"></span>
            <span v-else class="plz-favorit-isoffline" :title="getSexTitle"></span>
        </div>

        <div class="plz-favorit-friend-title flex align-items-center mr-auto ">
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

        <span class="plz-ff-messages-count">
            <span v-if="(friend.messagesNumber > 0)" class="py-0 mr-2">
                {{friend.messagesNumber}}
            </span>
        </span>
    </div>
</template>

<script>
import PliziFriend from '../classes/PliziFriend.js';

export default {
name : 'FavoritFriendItem',
props : {
    friend : PliziFriend
},

methods: {
    showRelatedChat(){
        this.$root.$alert(`По клику будем показывать привязанный чат`, 'bg-info', 5);
    },

    getSexTitle(fItem){
        if (`m` === fItem.sex)
            return `был давно`;

        if (`f` === fItem.sex)
            return `была давно`;

        return `был(а) давно`;
    }
}

}
</script>
