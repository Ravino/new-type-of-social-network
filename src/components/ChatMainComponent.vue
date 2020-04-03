<template>
    <div id="chatMain" class="row bg-light border">
        <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-auto pl-lg-0 pl-xl-0 px-sm-0 px-md-0">
            <!--        <ChatList v-bind:friends="friends"></ChatList>-->
            <ul id="chatFriends" class="list-unstyled mb-0">
                <ChatListItem v-for="(friend, friendIndex) in friends" v-bind:friend="friend" v-bind:key="friendIndex" v-bind:friendID="friendIndex"></ChatListItem>
            </ul>
        </div>

        <div id="chatMessangesWrapper" class="col-8 col-lg-8 col-xl-8 bg-light d-none d-lg-block d-xl-block h-100">
            <ChatHeader v-bind:companion="companion"></ChatHeader>
            <ChatMessages v-bind:messages="messages" v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatMessages>
            <ChatFooter v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatFooter>
        </div>
    </div>
</template>

<script>
import ChatList from '../components/ChatList.vue';
import ChatListItem from '../components/ChatListItem.vue';
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatFooter from './ChatFooter.vue';

export default {
    name: 'ChatMainComponent',
    props: {
        friends: Array,
        messages: Array,
        companion: Object,
        selfPerson: Object
    },
    components: {ChatList, ChatListItem, ChatHeader, ChatMessages, ChatFooter},
    data() {
        return {}
    },

    methods: {},

    mounted() {
        console.log(this.$store.getters.chatChannel);
        var conn = new ab.connect('ws://192.168.10.10:8080/pubsub', s => {
            s.subscribe(this.$store.getters.chatChannel, function(topic, data){
                console.log(data.data);
            })
        }, function(code, reason, detail){

        }, {maxRetries:10,retryDelay:4000,skipSubprotocolCheck:true});
    },
}
</script>
