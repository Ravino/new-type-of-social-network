<template>
    <ul id="chatFriends" class="list-unstyled w-25 mb-0">
        <ChatFriendsItem v-for="(friend, friendIndex) in friends" v-bind:friend="friend" v-bind:key="friendIndex" v-bind:friendID="friendIndex"></ChatFriendsItem>
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
    //TODO: @tga - заменить потом friendIndex на ID юзера
    return {

    }
},

methods: {
},

mounted(){

}

}
</script>
