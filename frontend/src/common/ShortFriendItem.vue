<template>
    <div class="plz-short-friends-item d-flex align-items-center py-1 px-3">

        <router-link tag="a" class="plz-short-friend-userpic text-body" :to="`/user-`+friend.id">
            <img class="plz-short-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName"/>

            <span v-if="friend.isOnline" class="plz-short-isonline" title="в сети"></span>
            <span v-else class="plz-short-isoffline" :title="getSexTitle()"></span>
        </router-link>

        <div class="plz-short-friend-title flex align-items-center mr-auto ">
            <router-link :to="`/user-`+friend.id" class="plz-short-friend-name">
                {{friend.firstName}}
            </router-link>

            <div class="plz-short-friend-status">
                <p>{{friend.commonFriendsNumber}} общих друга</p>
            </div>
        </div>

        <router-link to="/chats-list" tag="a" class="plz-short-friend-is-active text-body">
            <IconMessageShort/>
        </router-link>
    </div>
</template>
<script>
import IconMessageShort from '../icons/IconMessageShort.vue'

export default {
name : 'ShortFriendItem',
components : { IconMessageShort },
props : {
    friend : Object
},

methods: {
    getSexTitle(){
        if (`m` === this.friend.sex)
            return `был давно`;

        if (`f` === this.friend.sex)
            return `была давно`;

        return `был(а) давно`;
    }
},
}
</script>
