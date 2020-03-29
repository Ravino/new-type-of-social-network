<template>
    <div id="chatMain" class="bg-light border d-flex justify-content-start align-items-stretch">
        <ChatFriendsList v-bind:friends="friends"></ChatFriendsList>

        <div id="chatMessangesWrapper" class="bg-light w-75 d-flex flex-column">
            <ChatHeader v-bind:companion="companion"></ChatHeader>
            <ChatMessages v-bind:messages="messages" v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatMessages>
            <ChatFooter v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatFooter>
        </div>

    </div>
</template>

<script>
import ChatFriendsList from '../components/ChatFriendsList.vue';
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatFooter from './ChatFooter.vue';

export default {
name: 'ChatMainComponent',
props: {
    friends : Array,
    messages : Array,
    companion: Object,
    selfPerson: Object
},
components: { ChatFriendsList, ChatHeader, ChatMessages, ChatFooter },
data () {
    return {
    }
},

methods: {
}

}
</script>
