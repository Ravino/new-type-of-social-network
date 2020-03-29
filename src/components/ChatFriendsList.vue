<template>
    <ul id="chatFriends" class="list-unstyled w-25 mb-0">
        <ChatFriendsItem v-for="(friend) in friends" v-bind:friend="friend"></ChatFriendsItem>
    </ul>
</template>

<script>
import ChatFriendsItem from '../components/ChatFriendsItem.vue';

export default {
name: 'ChatFriendsList',
props: {
    friends : Array,
},
components: { ChatFriendsItem },
data() {
    return {

    }
},

methods: {
},

mounted(){

}

}
</script>
