<template>
    <ul id="chatFriends" class="list-unstyled w-100 mb-0">
        <ChatListItem v-for="(friend, friendIndex) in friends" v-bind:friend="friend" v-bind:key="friendIndex" v-bind:friendID="friendIndex"></ChatListItem>
    </ul>
</template>

<script>
import ChatListItem from '../components/ChatListItem.vue';

export default {
name: 'ChatList',
props: {
    friends : Array,
},
components: { ChatListItem },
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
